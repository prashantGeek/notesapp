import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

// This script can be used to test authenticated endpoints
// You need to provide a valid session cookie from a logged-in browser session

async function testAuthenticatedEndpoints(sessionCookie) {
    if (!sessionCookie) {
        console.log('❌ No session cookie provided');
        console.log('📖 To get a session cookie:');
        console.log('1. Start frontend: cd notes-frontend && npm run dev');
        console.log('2. Visit http://localhost:3001 and login with Google');
        console.log('3. Open browser dev tools → Application/Storage → Cookies');
        console.log('4. Copy the entire cookie string');
        console.log('5. Run: node test-authenticated.js "your-cookie-string"');
        return;
    }

    console.log('🔐 Testing Authenticated Endpoints');
    console.log('='.repeat(40));

    const headers = {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie
    };

    let createdNoteId = null;

    // Test authenticated user info
    try {
        console.log('\n👤 Testing GET /auth/user (authenticated)...');
        const response = await fetch(`${BASE_URL}/auth/user`, { headers });
        const data = await response.json();
        console.log(`   Status: ${response.status}`);
        console.log(`   Response:`, JSON.stringify(data, null, 2));
        
        if (response.status === 200 && data.success) {
            console.log('   ✅ Authentication working correctly');
        } else {
            console.log('   ❌ Authentication failed - check your session cookie');
            return;
        }
    } catch (error) {
        console.error('   ❌ Error:', error.message);
        return;
    }

    // Test creating a note
    try {
        console.log('\n📝 Testing POST /api/notes (create note)...');
        const response = await fetch(`${BASE_URL}/api/notes`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: 'Test Note from API',
                content: 'This note was created via API testing at ' + new Date().toISOString()
            })
        });
        const data = await response.json();
        console.log(`   Status: ${response.status}`);
        console.log(`   Response:`, JSON.stringify(data, null, 2));
        
        if (response.status === 201 && data.success) {
            createdNoteId = data.note.id;
            console.log(`   ✅ Note created successfully with ID: ${createdNoteId}`);
        }
    } catch (error) {
        console.error('   ❌ Error:', error.message);
    }

    // Test getting all notes
    try {
        console.log('\n📄 Testing GET /api/notes (get all notes)...');
        const response = await fetch(`${BASE_URL}/api/notes`, { headers });
        const data = await response.json();
        console.log(`   Status: ${response.status}`);
        console.log(`   Response: Found ${data.notes ? data.notes.length : 0} notes`);
        
        if (data.notes && data.notes.length > 0) {
            console.log(`   📋 Notes preview:`);
            data.notes.slice(0, 3).forEach((note, index) => {
                console.log(`      ${index + 1}. ${note.title} (ID: ${note.id})`);
            });
        }
    } catch (error) {
        console.error('   ❌ Error:', error.message);
    }

    // Test getting specific note
    if (createdNoteId) {
        try {
            console.log(`\n🔍 Testing GET /api/notes/${createdNoteId} (get specific note)...`);
            const response = await fetch(`${BASE_URL}/api/notes/${createdNoteId}`, { headers });
            const data = await response.json();
            console.log(`   Status: ${response.status}`);
            console.log(`   Response:`, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('   ❌ Error:', error.message);
        }

        // Test updating the note
        try {
            console.log(`\n✏️  Testing PUT /api/notes/${createdNoteId} (update note)...`);
            const response = await fetch(`${BASE_URL}/api/notes/${createdNoteId}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                    title: 'Updated Test Note from API',
                    content: 'This note was updated via API testing at ' + new Date().toISOString()
                })
            });
            const data = await response.json();
            console.log(`   Status: ${response.status}`);
            console.log(`   Response:`, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('   ❌ Error:', error.message);
        }

        // Test deleting the note
        try {
            console.log(`\n🗑️  Testing DELETE /api/notes/${createdNoteId} (delete note)...`);
            const response = await fetch(`${BASE_URL}/api/notes/${createdNoteId}`, {
                method: 'DELETE',
                headers
            });
            const data = await response.json();
            console.log(`   Status: ${response.status}`);
            console.log(`   Response:`, JSON.stringify(data, null, 2));
            
            if (response.status === 200 && data.success) {
                console.log('   ✅ Note deleted successfully');
            }
        } catch (error) {
            console.error('   ❌ Error:', error.message);
        }
    }

    // Test validation errors
    try {
        console.log('\n⚠️  Testing POST /api/notes (validation error - missing title)...');
        const response = await fetch(`${BASE_URL}/api/notes`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                content: 'Content without title'
            })
        });
        const data = await response.json();
        console.log(`   Status: ${response.status}`);
        console.log(`   Response:`, JSON.stringify(data, null, 2));
        
        if (response.status === 400) {
            console.log('   ✅ Validation working correctly');
        }
    } catch (error) {
        console.error('   ❌ Error:', error.message);
    }

    console.log('\n🎉 Authenticated endpoint testing complete!');
}

// Get session cookie from command line argument
const sessionCookie = process.argv[2];
testAuthenticatedEndpoints(sessionCookie);
