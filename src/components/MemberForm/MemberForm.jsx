import { useState, useEffect } from 'react';
import './MemberForm.css';

const MemberForm = ({ member, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    tasksText: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // If editing, populate form with member data
  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        role: member.role || '',
        tasksText: member.tasks ? member.tasks.join(', ') : ''
      });
    }
  }, [member]);

  const validate = (data) => {
    const newErrors = {};
    
    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!data.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate single field on blur
    const fieldErrors = validate({
      ...formData,
      [name]: formData[name]
    });
    
    if (fieldErrors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // If no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      // Parse tasks from comma-separated string
      const tasks = formData.tasksText
        .split(',')
        .map(task => task.trim())
        .filter(task => task.length > 0);
      
      onSubmit({
        ...(member || {}), // Keep original id if editing
        name: formData.name.trim(),
        role: formData.role.trim(),
        tasks
      });
      
      // Reset form
      setFormData({
        name: '',
        role: '',
        tasksText: ''
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="member-form-container">
      <h3>{member ? 'Edit Team Member' : 'Add Team Member'}</h3>
      <form onSubmit={handleSubmit} className="member-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name && touched.name ? 'error' : ''}
            placeholder="Enter full name"
          />
          {errors.name && touched.name && <p className="error-message">{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.role && touched.role ? 'error' : ''}
            placeholder="e.g. Frontend Developer"
          />
          {errors.role && touched.role && <p className="error-message">{errors.role}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="tasksText">Tasks (comma-separated)</label>
          <textarea
            id="tasksText"
            name="tasksText"
            value={formData.tasksText}
            onChange={handleChange}
            placeholder="e.g. Design system, API integration, Bug fixes"
            rows="3"
          />
          <p className="help-text">Enter tasks separated by commas</p>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {member ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;