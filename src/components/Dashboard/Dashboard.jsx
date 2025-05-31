import { useState, useEffect } from 'react';
import MemberCard from '../MemberCard/MemberCard';
import MemberForm from '../MemberForm/MemberForm';
import './Dashboard.css';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  // Load demo data on initial render
  useEffect(() => {
    const demoMembers = [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Frontend Developer',
        tasks: ['Design system implementation', 'Responsive UI development', 'Fix header navigation']
      },
      {
        id: 2,
        name: 'Michael Chen',
        role: 'UX Designer',
        tasks: ['User interviews', 'Dashboard wireframes', 'Design prototype']
      },
      {
        id: 3,
        name: 'Alex Rodriguez',
        role: 'Product Manager',
        tasks: ['Sprint planning', 'Roadmap updates', 'Stakeholder meetings']
      }
    ];
    setMembers(demoMembers);
  }, []);

  const addMember = (member) => {
    const newMember = {
      ...member,
      id: Date.now()
    };
    setMembers([...members, newMember]);
  };

  const updateMember = (updatedMember) => {
    setMembers(members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
    setEditingMember(null);
  };

  const deleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const startEditing = (member) => {
    setEditingMember(member);
  };

  const cancelEditing = () => {
    setEditingMember(null);
  };

  return (
    <div className="dashboard">
      <div className="form-container">
        <MemberForm
          member={editingMember}
          onSubmit={editingMember ? updateMember : addMember}
          onCancel={cancelEditing}
        />
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Team Members</h2>
        </div>
        
        {members.length === 0 ? (
          <div className="empty-state">
            <p>No team members yet. Add your first team member to get started!</p>
          </div>
        ) : (
          <div className="members-grid">
            {members.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                onEdit={() => startEditing(member)}
                onDelete={() => deleteMember(member.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;