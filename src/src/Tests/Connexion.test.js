import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '@testing-library/jest-dom';

describe('Test Connexion form', () => {

  it('Connexion réussie', async () => {
    const mockFirebase = {
      auth: jest.fn(() => ({
        onAuthStateChanged: jest.fn((callback) =>
          callback({
            email: 'test@test.fr',
            password: 'password',
          })
        ),
        signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
      }))
    };
  });
});