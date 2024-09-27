import * as user from '../user'


describe(" user handler", () => {
    it('should create a new user', async () => {

        const mockReq = {body: {username: 'testuser2', password: 'testpassword2'}}
        const mockRes = {json: jest.fn(({token}) => {
            expect(token).toBeTruthy()
        })}

        const mockNext = jest.fn()
        
        const newUser=  await user.createNewUser(mockReq, mockRes, () => {})
        
    })
})