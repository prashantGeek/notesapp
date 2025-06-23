import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

// Test all available endpoints with detailed documentation
async function testDetailedEndpoints() {
    console.log('🔧 Detailed API Endpoint Testing');
    console.log('='.repeat(60));
    
    const tests = [
        {
            name: 'Health Check',
            method: 'GET',
            url: `${BASE_URL}/`,
            description: 'Server status and basic info',
            expectedStatus: 200
        },
        {
            name: 'Google OAuth Initiation',
            method: 'GET',
            url: `${BASE_URL}/auth/google`,
            description: 'Redirects to Google OAuth (should redirect)',
            expectedStatus: 302,
            skipBodyParse: true
        },
        {
            name: 'Current User Info (Unauthenticated)',
            method: 'GET',
            url: `${BASE_URL}/auth/user`,
            description: 'Get current user info when not logged in',
            expectedStatus: 401
        },
        {
            name: 'Logout',
            method: 'POST',
            url: `${BASE_URL}/auth/logout`,
            description: 'Logout current user',
            expectedStatus: 200
        },
        {
            name: 'Get All Notes (Unauthenticated)',
            method: 'GET',
            url: `${BASE_URL}/api/notes`,
            description: 'Fetch all notes when not authenticated',
            expectedStatus: 401
        },
        {
            name: 'Get Specific Note (Unauthenticated)',
            method: 'GET',
            url: `${BASE_URL}/api/notes/1`,
            description: 'Fetch specific note when not authenticated',
            expectedStatus: 401
        },
        {
            name: 'Create Note (Unauthenticated)',
            method: 'POST',
            url: `${BASE_URL}/api/notes`,
            description: 'Create note when not authenticated',
            body: { title: 'Test Note', content: 'Test content' },
            expectedStatus: 401
        },
        {
            name: 'Update Note (Unauthenticated)',
            method: 'PUT',
            url: `${BASE_URL}/api/notes/1`,
            description: 'Update note when not authenticated',
            body: { title: 'Updated Note', content: 'Updated content' },
            expectedStatus: 401
        },
        {
            name: 'Delete Note (Unauthenticated)',
            method: 'DELETE',
            url: `${BASE_URL}/api/notes/1`,
            description: 'Delete note when not authenticated',
            expectedStatus: 401
        },
        {
            name: 'Invalid Endpoint',
            method: 'GET',
            url: `${BASE_URL}/nonexistent`,
            description: 'Test 404 handling',
            expectedStatus: 404,
            skipBodyParse: true
        },
        {
            name: 'Create Note with Empty Title',
            method: 'POST',
            url: `${BASE_URL}/api/notes`,
            description: 'Test validation - empty title (would be 400 if authenticated)',
            body: { title: '', content: 'Some content' },
            expectedStatus: 401 // Will be 401 due to auth, but would be 400 if authenticated
        },
        {
            name: 'Create Note with Missing Title',
            method: 'POST',
            url: `${BASE_URL}/api/notes`,
            description: 'Test validation - missing title (would be 400 if authenticated)',
            body: { content: 'Some content without title' },
            expectedStatus: 401 // Will be 401 due to auth, but would be 400 if authenticated
        }
    ];

    let passedTests = 0;
    let totalTests = tests.length;

    for (const test of tests) {
        console.log(`\n📋 Testing: ${test.name}`);
        console.log(`   ${test.description}`);
        console.log(`   ${test.method} ${test.url}`);
        
        try {
            const options = {
                method: test.method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            if (test.body) {
                options.body = JSON.stringify(test.body);
                console.log(`   Body: ${JSON.stringify(test.body)}`);
            }
            
            const response = await fetch(test.url, options);
            
            let responseData = null;
            if (!test.skipBodyParse) {
                try {
                    responseData = await response.json();
                } catch (e) {
                    responseData = await response.text();
                }
            }
            
            const statusMatch = response.status === test.expectedStatus;
            const statusIcon = statusMatch ? '✅' : '❌';
            
            console.log(`   ${statusIcon} Status: ${response.status} (expected: ${test.expectedStatus})`);
            
            if (responseData && !test.skipBodyParse) {
                console.log(`   📤 Response:`, typeof responseData === 'object' 
                    ? JSON.stringify(responseData, null, 2).split('\n').map(line => `      ${line}`).join('\n')
                    : `      ${responseData}`);
            }
            
            if (statusMatch) {
                passedTests++;
            }
            
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`🏆 Test Results: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log('🎉 All endpoints working correctly!');
    } else {
        console.log('⚠️  Some tests failed - check the details above');
    }
    
    // Additional manual testing instructions
    console.log('\n📖 Manual Testing Instructions:');
    console.log('='.repeat(60));
    console.log('🔐 To test authenticated endpoints:');
    console.log('1. Open browser and go to: http://localhost:3001 (frontend)');
    console.log('2. Click login and authenticate with Google');
    console.log('3. Use browser dev tools to copy session cookies');
    console.log('4. Test authenticated endpoints with tools like Postman/Insomnia');
    console.log('');
    console.log('🌐 Google OAuth Testing:');
    console.log('1. Visit: http://localhost:3000/auth/google');
    console.log('2. Should redirect to Google OAuth consent screen');
    console.log('3. After consent, should redirect to: http://localhost:3001/dashboard');
    console.log('');
    console.log('📝 Notes CRUD Testing (after authentication):');
    console.log('- POST /api/notes with valid title and content');
    console.log('- GET /api/notes to list all notes');
    console.log('- GET /api/notes/{id} to get specific note');
    console.log('- PUT /api/notes/{id} to update note');
    console.log('- DELETE /api/notes/{id} to delete note');
}

// Check server and run tests
async function main() {
    try {
        // Quick server check
        const healthCheck = await fetch(`${BASE_URL}/`);
        if (!healthCheck.ok) {
            throw new Error('Server health check failed');
        }
        console.log('✅ Server is running and responding\n');
        
        await testDetailedEndpoints();
        
    } catch (error) {
        console.error('❌ Server is not running or not responding');
        console.log('Please ensure the server is started with: npm start');
        console.log('Expected server URL:', BASE_URL);
    }
}

main();
