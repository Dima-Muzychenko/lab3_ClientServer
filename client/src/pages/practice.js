import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../index.css';

const Practice = () => {
    const [practices, setPractices] = useState([]);
    const [formData, setFormData] = useState({
        examination_id: '',
        is_passed: '',
        used_attempts: '',
        left_attempts: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {//вивід всього
        async function fetchData() {
            const response = await axios.get('http://localhost:5000/api/practice/');
            setPractices(response.data);
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {//пошук по id
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {//додавання
        event.preventDefault();
        const response = await axios.post('http://localhost:5000/api/practice/add/', formData);
        if (response.data.is_passed !== true || response.data.is_passed !== 'Yes'){
            response.data.is_passed = false
        }
        setPractices([...practices, response.data]);
        setFormData({
            examination_id: '',
            is_passed: '',
            used_attempts: '',
            left_attempts: ''
        });
    };

    const handleDelete = async (id) => {//видалення
        await axios.post(`http://localhost:5000/api/practice/${id}`);
        setPractices(practices.filter((practice) => practice.id !== id));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPractices = practices.filter((practice) => {
        const {examination_id, is_passed, used_attempts, left_attempts} = practice;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
            examination_id.toLowerCase().includes(lowerSearchTerm) ||
            (is_passed ? 'Yes' : 'No').toLowerCase().includes(lowerSearchTerm) ||
            used_attempts.toLowerCase().includes(lowerSearchTerm) ||
            left_attempts.toLowerCase().includes(lowerSearchTerm)
        );
    });

    return (
        <div>
            <h1>Practices</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Examination ID:
                    <input
                        type="text"
                        name="examination_id"
                        value={formData.examination_id}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Is Passed:
                    <input
                        type="checkbox"
                        name="is_passed"
                        checked={formData.is_passed}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Used attempts:
                    <input
                        type="text"
                        name="used_attempts"
                        value={formData.used_attempts}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Left attempts:
                    <input
                        type="text"
                        name="left_attempts"
                        value={formData.left_attempts}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Add Practice</button>
            </form>
            <label>
                Search:
                <input type="text" value={searchTerm} onChange={handleSearch} />
            </label>
            <table>
                <thead>
                <tr>
                    <th>Examination ID</th>
                    <th>Is Passed</th>
                    <th>Used Attempts</th>
                    <th>Left Attempts</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredPractices.map((practice) => (
                    <tr key={practice.id}>
                        <td>{practice.examination_id}</td>
                        <td>{practice.is_passed ? 'Yes' : 'No'}</td>
                        <td>{practice.used_attempts}</td>
                        <td>{practice.left_attempts}</td>
                        <td>
                            <button onClick={() => handleDelete(practice.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Practice;