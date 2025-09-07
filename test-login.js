// Simple test script to test the login API
const testLogin = async () => {
  try {
    console.log('Testing login API...');
    
    const response = await fetch('http://localhost:3001/api/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@srilankahow.com',
        password: 'admin123',
      }),
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testLogin();
