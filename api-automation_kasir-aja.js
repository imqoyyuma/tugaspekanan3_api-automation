const supertest = require("supertest");
const chai = require("chai");

const request = supertest("https://kasir-api.belajarqa.com");
const expect = chai.expect;
let accessToken;
let userId;

describe("Registration", () => {
    it(`Should create a new account`, async () => {
        const response = await request.post("/registration").send({
            name: "Toko Ane",
            email: "toko@ane.com",
            password: "123456",
        });
        console.log(response.body); // Tambahkan ini untuk melihat isi respons
        console.log(response.status); // Tambahkan ini untuk melihat status respons
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property(
            "message",
            "Toko berhasil didaftarkan"
        );
    });
});

describe("Login", () => {
    it(`Should login successfully`, async () => {
        const response = await request
            .post("/authentications")
            .set("Authorization", "Bearer accessToken")
            .send({
                email: "toko@ane.com",
                password: "123456",
            });
        console.log(response.body);
        console.log(response.status);
        expect(response.status).to.equal(201);
        expect(response.body.data).to.have.property("accessToken");
        accessToken = response.body.data.accessToken;
        userId = response.body.data.user.id;
    });
});

describe("Create User", () => {
    it(`Should create user successfully`, async () => {
        const response = await request
            .post("/users")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                name: "kasir-serbaguna",
                email: "user@example.com",
                password: "jiasda2321@",
            });
        console.log(response.status);
        console.log(response.body);
        expect(response.status).to.equal(201);
        expect(response.body.data).to.have.property("userId");
    });
});

describe("Get User Detail", () => {
    it(`Should get user detail`, async () => {
        const response = await request
            .get(`/users/${userId}`)
            .set("Authorization", `Bearer ${accessToken}`);
        console.log(response.status);
        console.log(response.body);
        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.property("user");
    });
});

describe("Update User", () => {
    it(`Should update user data`, async () => {
        const response = await request
            .put(`/users/${userId}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                name: "Toko Ane Diupdate",
                email: "toko@ane.com",
            });
        console.log(response.status);
        console.log(response.body);
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("User berhasil diupdate");
    });
});

describe("Delete User", () => {
    it(`Should delete user`, async () => {
        const response = await request
            .delete(`/users/${userId}`)
            .set("Authorization", `Bearer ${accessToken}`);
        console.log(response.status);
        console.log(response.body);
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("User berhasil dihapus");
    });
});
