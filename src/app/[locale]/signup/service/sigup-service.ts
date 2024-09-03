
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/signupapi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      return res;
    } catch (error) {
      console.error('Error during sign-up:', error);
      throw error;
    }
  };
  