// import { expect } from "chai";
// import sinon from "sinon";
// import { addUserController } from "../src/controllers/users.controller.js";
// import { addUserService } from "../src/services/users.services.js";
// import * as addUserServiceModule from "../src/services/users.services.js";
// import bcrypt from 'bcrypt'

// describe('Testing requests on database', () => {
   
//     let error, req, res ;
//     beforeEach(() => {
//         req = {
//             body: {
//                 username: 'testuser',
//                 email: 'test@example.com',
//                 password: 'password123'
//             }
//         };
//         res = {
//             status: sinon.stub().returnsThis(),
//             send: sinon.stub(),
//             json: sinon.stub()
//         };  
//         error = new Error();
//     });

//     it('should successfully register a user', async () => {
//         const addUserServiceStub = sinon.stub( );
//         addUserServiceStub.resolves({ id: '123', username: 'testuser' });
//         sinon.replace(addUserServiceModule, 'addUserService', addUserServiceStub);

//         await addUserController(req, res);

//         expect(addUserServiceStub.calledOnceWith(req.body)).to.be.true;
//         expect(res.status.calledOnceWith(201)).to.be.true;
//         expect(res.send.calledOnceWith({ message: 'User was registered successfully' })).to.be.true;
//         sinon.restore();
//     });


// });