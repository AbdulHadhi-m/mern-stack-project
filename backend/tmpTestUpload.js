import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const testUpload = async () => {
    try {
        // We need an admin token. We can use the one created earlier.
        const loginRes = await axios.post('http://localhost:3000/api/admin/', {
            email: 'admin@rentora.com',
            password: 'admin123'
        });

        const token = loginRes.data.token;
        console.log("Got token.");

        // Create a dummy image
        fs.writeFileSync('dummy.jpg', 'dummy image content');

        const form = new FormData();
        form.append('title', 'Test Product');
        form.append('price', '1234');
        form.append('description', 'Test Description');
        form.append('category', 'flat');
        form.append('image', fs.createReadStream('dummy.jpg'));

        const res = await axios.post('http://localhost:3000/api/admin/product', form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Success!", res.data);
    } catch (error) {
        console.error("Error!", error.response ? error.response.data : error.message);
    } finally {
        if (fs.existsSync('dummy.jpg')) fs.unlinkSync('dummy.jpg');
    }
};

testUpload();
