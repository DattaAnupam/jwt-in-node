import { authenticateToken } from '../index';

describe('authenticateToken', () => {
  it('should return true when the token is valid', () => {
    const req = {
      headers: {
        authorization: 'Bearer valid_token',
      }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return false when the token is invalid', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalid_token',
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    authenticateToken(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ message: 'Token not valid' });
    expect(next).not.toHaveBeenCalled();
  });
});