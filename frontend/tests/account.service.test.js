// accService.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios'; 
import accService from '../src/services/account.service';
import MockAdapter from 'axios-mock-adapter';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
global.localStorage = localStorageMock;

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
  localStorageMock.clear();
});

afterEach(() => {
  mock.reset();
});

describe('accService', () => {

  describe('registerService', () => {
    it('should register a new user successfully', async () => {
      const mockData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      mock.onPost(`${import.meta.env.VITE_BACKEND_URL}/register`).reply(201, { message: 'User registered' });

      const response = await accService.registerService(mockData);
      
      expect(response.status).toBe(201);
      expect(response.data.message).toBe('User registered');
    });

    it('should handle registration failure', async () => {
      const mockData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
      mock.onPost(`${import.meta.env.VITE_BACKEND_URL}/register`).reply(400, { message: 'Registration failed' });

      const error = await accService.registerService(mockData);
      
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe('Registration failed');
    });
  });

  describe('loginService', () => {
    it('should login user and set localStorage', async () => {
      const mockData = { email: 'test@example.com', password: 'password123' };
      const userResponse = { accessToken: 'token123', username: 'testuser' };
      mock.onPost(`${import.meta.env.VITE_BACKEND_URL}/login`).reply(200, userResponse);

      const response = await accService.loginService(mockData);

      expect(response.status).toBe(200);
      expect(response.data).toEqual(userResponse);
      expect(localStorageMock.getItem('currentUser')).toBe(JSON.stringify(userResponse));
    });

    it('should handle login failure', async () => {
      const mockData = { email: 'test@example.com', password: 'wrongpassword' };
      mock.onPost(`${import.meta.env.VITE_BACKEND_URL}/login`).reply(401, { message: 'Invalid credentials' });

      const response = await accService.loginService(mockData);

      expect(response.error).toBe('Invalid credentials');
    });
  });

  describe('editPasswordService', () => {
    it('should change password successfully', async () => {
      const mockData = { newPassword: 'newpassword123' };
      mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/changePassword`).reply(200, { message: 'Password changed' });

      const response = await accService.editPasswordService(mockData);

      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Password changed');
    });

    it('should handle change password failure', async () => {
      const mockData = { newPassword: 'newpassword123' };
      mock.onPatch(`${import.meta.env.VITE_BACKEND_URL}/changePassword`).reply(400, { message: 'Change password failed' });

      const error = await accService.editPasswordService(mockData);

      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toBe('Change password failed');
    });
  });

  describe('logout', () => {
    it('should remove user from localStorage', () => {
      localStorageMock.setItem('currentUser', JSON.stringify({ accessToken: 'token123' }));
      accService.logout();

      expect(localStorageMock.getItem('currentUser')).toBe(null);
    });
  });

  describe('getCurrentUser', () => {
    it('should get the current user from localStorage', () => {
      const user = { accessToken: 'token123', username: 'testuser' };
      localStorageMock.setItem('currentUser', JSON.stringify(user));

      const currentUser = accService.getCurrentUser();

      expect(currentUser).toEqual(user);
    });

    it('should return null if no user is found in localStorage', () => {
      const currentUser = accService.getCurrentUser();

      expect(currentUser).toBe(null);
    });
  });
});
