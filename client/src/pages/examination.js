import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../index.css';
//щоб усе прауювали - потрібно запустити також бекенд (сервер)
const Examination = () => {
    const [examinations, setExaminations] = useState([]);
    const [formData, setFormData] = useState({
        passport_id: '',
        mia_id: '',
        passed_category: '',
        is_passed: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {//вивід всього
        async function fetchData() {
            const response = await axios.get('http://localhost:5000/api/examination/');
            setExaminations(response.data);
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {//пошук по id
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {//додавання
        event.preventDefault();
        const response = await axios.post('http://localhost:5000/api/examination/add/', formData);
        if (response.data.is_passed !== true || response.data.is_passed !== 'Yes'){
            response.data.is_passed = false
        }
        setExaminations([...examinations, response.data]);
        setFormData({
            passport_id: '',
            mia_id: '',
            passed_category: '',
            is_passed: '',
        });
    };

    const handleDelete = async (id) => {//видалення
        await axios.post(`http://localhost:5000/api/examination/${id}`);
        setExaminations(examinations.filter((examination) => examination.id !== id));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredExaminations = examinations.filter((examination) => {
        const { passport_id, mia_id, passed_category, is_passed } = examination;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
            passport_id.toLowerCase().includes(lowerSearchTerm) ||
            mia_id.toLowerCase().includes(lowerSearchTerm) ||
            passed_category.toLowerCase().includes(lowerSearchTerm) ||
            (is_passed ? 'Yes' : 'No').toLowerCase().includes(lowerSearchTerm)
        );
    });

    return (
        <div>
            <h1>Examinations</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Passport ID:
                    <input
                        type="text"
                        name="passport_id"
                        value={formData.passport_id}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    MIA ID:
                    <input
                        type="text"
                        name="mia_id"
                        value={formData.mia_id}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Passed Category:
                    <input
                        type="text"
                        name="passed_category"
                        value={formData.passed_category}
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
                <button type="submit">Add Examination</button>
            </form>
            <label>
                Search:
                <input type="text" value={searchTerm} onChange={handleSearch} />
            </label>
            <table>
                <thead>
                <tr>
                    <th>Passport ID</th>
                    <th>MIA ID</th>
                    <th>Passed Category</th>
                    <th>Is Passed</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredExaminations.map((examination) => (
                    <tr key={examination.id}>
                        <td>{examination.passport_id}</td>
                        <td>{examination.mia_id}</td>
                        <td>{examination.passed_category}</td>
                        <td>{examination.is_passed ? 'Yes' : 'No'}</td>
                        <td>
                            <button onClick={() => handleDelete(examination.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Examination;