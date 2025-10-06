export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log('CSP Violation Report:', req.body);
        res.status(204).end();
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}