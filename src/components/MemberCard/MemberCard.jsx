import { useState } from 'react';
import './MemberCard.css';

const MemberCard = ({ member, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className={`member-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="member-header">
        <div className="member-info">
          <h3 className="member-name">{member.name}</h3>
          <p className="member-role">{member.role}</p>
        </div>
        <div className="member-actions">
          <button 
            className="action-button edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit member"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button 
            className={`action-button delete ${showDeleteConfirm ? 'confirm' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            aria-label={showDeleteConfirm ? "Confirm delete" : "Delete member"}
          >
            {showDeleteConfirm ? (
              <svg xmlns="http://www.w3.org/2000/svg\" viewBox="0 0 24 24\" width="18\" height="18\" fill="none\" stroke="currentColor\" strokeWidth="2\" strokeLinecap="round\" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            )}
          </button>
          {showDeleteConfirm && (
            <button 
              className="action-button cancel"
              onClick={cancelDelete}
              aria-label="Cancel delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className={`member-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="member-tasks">
          <h4>Tasks:</h4>
          {member.tasks && member.tasks.length > 0 ? (
            <ul>
              {member.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks">No tasks assigned</p>
          )}
        </div>
      </div>
      
      <button 
        className="expand-button"
        onClick={toggleExpand}
        aria-label={isExpanded ? "Collapse details" : "Expand details"}
      >
        {isExpanded ? "Show less" : "Show more"}
        <svg 
          className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="18" 
          height="18" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default MemberCard;