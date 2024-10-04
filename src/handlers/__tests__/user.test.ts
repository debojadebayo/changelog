import * as user from '../user.js'
import { prismaMock } from '../../singleton.js'


describe(" user handler", () => {
    it('should create a new user', async () => {

        const mockReq = {body: {username: 'testuser2', password: 'testpassword2'}}
        const mockRes = {json: jest.fn(({token}) => {
            expect(token).toBeTruthy()
        })}

        const mockNext = jest.fn()
        
        const newUser=  await user.createNewUser(mockReq, mockRes, mockNext)

        console.log(prismaMock.user.create.mock.calls)

        expect(prismaMock.user.create).toHaveBeenCalledWith({
            data: {
                username: 'testuser2',
                password: expect.any(String)
            }
        })
        
    })
})