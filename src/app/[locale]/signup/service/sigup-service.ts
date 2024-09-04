
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (username:string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      return res;
    } catch (error) {
      console.error('Error during sign-up:', error);
      throw error;
    }
};
  


  
