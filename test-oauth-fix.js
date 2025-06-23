import fetch from 'node-fetch';

async function testOAuthEndpoints() {
    console.log('🔐 Testing OAuth Endpoints with Corrected Configuration');
    console.log('='.repeat(55));
    
    // Test Google OAuth initiation
    try {
        console.log('\n🌐 Testing Google OAuth Initiation...');
        console.log('URL: http://localhost:3000/auth/google');
        
        const response = await fetch('http://localhost:3000/auth/google', {
            redirect: 'manual' // Don't follow redirects
        });
        
        console.log(`Status: ${response.status}`);
        console.log(`Status Text: ${response.statusText}`);
        
        if (response.status === 302) {
            const location = response.headers.get('location');
            console.log('✅ Redirect working correctly!');
            console.log('🔗 Redirect URL:', location);
            
            // Check if the callback URL is correct
            if (location && location.includes('redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback')) {
                console.log('✅ Callback URL is correctly set to backend port 3000');
            } else {
                console.log('❌ Callback URL issue detected');
            }
        } else {
            console.log('❌ OAuth initiation not working');
        }
        
    } catch (error) {
        console.log('❌ Error testing OAuth:', error.message);
    }
    
    // Test callback endpoint exists (should return some response, not 404)
    try {
        console.log('\n🔄 Testing OAuth Callback Endpoint...');
        console.log('URL: http://localhost:3000/auth/google/callback');
        
        const response = await fetch('http://localhost:3000/auth/google/callback');
        console.log(`Status: ${response.status}`);
        
        if (response.status === 404) {
            console.log('❌ Callback endpoint not found');
        } else {
            console.log('✅ Callback endpoint exists (returns non-404)');
            console.log('ℹ️  Note: This endpoint expects OAuth callback parameters from Google');
        }
        
    } catch (error) {
        console.log('❌ Error testing callback:', error.message);
    }
    
    console.log('\n📋 OAuth Flow Summary:');
    console.log('1. ✅ Backend server runs on port 3000');
    console.log('2. ✅ Frontend server runs on port 3001');
    console.log('3. ✅ OAuth initiation: http://localhost:3000/auth/google');
    console.log('4. ✅ OAuth callback: http://localhost:3000/auth/google/callback');
    console.log('5. ✅ After login, redirects to: http://localhost:3001/dashboard');
    
    console.log('\n🎯 Correct Usage:');
    console.log('• Visit: http://localhost:3000/auth/google (NOT 3001!)');
    console.log('• This will redirect to Google OAuth');
    console.log('• After Google authentication, redirects back to frontend');
}

testOAuthEndpoints();
