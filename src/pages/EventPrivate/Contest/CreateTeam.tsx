import { useState } from 'react';

// COMPONENT IMPORT
import Dropdown from '../../../components/EventPrivate/Contest/Dropdown';
import InputTextField from '../../../components/EventPrivate/Contest/InputTextField';
import ProfessionalForm from '../../../components/EventPrivate/Contest/ProfessionalForm';
import StudentForm from '../../../components/EventPrivate/Contest/StudentForm';
// MODAL IMPORT
import AddMemberModal from '../../../components/EventPrivate/Contest/AddMemberModal';
import Navbar from '../../../components/Navbar';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../../../state/store';
import toas from '../../../utils/toas';

import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const productId = query.get('id') || '';
  const { token } = useAppSelector((state: any) => state?.user);
  const [userType, setUserType] = useState('Select Occupation');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [yesNoDropdownOpen, setYesNoDropdownOpen] = useState(false);
  const [yesNoSelection, setYesNoSelection] = useState(
    'Are you competing as a team?'
  );
  const [teamMembers, setTeamMembers] = useState<
    { email: string; role: string; user_id: string }[]
  >([]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addMemberModal, setAddMemberModal] = useState(false);

 
  // STUDENT VALUES
  const [nameOfSchool, setNameOfSchool] = useState('');
  const [degreeProgram, setDegreeProgram] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [idNumber, setIdNumber] = useState('');

  // PROFESSIONAL
  const [job, setJob] = useState('');
  const [companyOrganization, setCompanyOrganization] = useState('');
  const [yearOfExperience, setYearsOfExperience] = useState('');

  const [teamName, setTeamName] = useState('');

  // HANDLE ADD MEMBER
  const handleAddMember = async () => {
    if (newMemberEmail && newMemberRole) {
      try {
        const res = await axios({
          method: 'post',
          url: '/product/find-user-email',
          data: { email: newMemberEmail },
          headers: { authorization: `Token ${token}` },
        });
        if (editIndex !== null) {
          const updatedMembers = [...teamMembers];
          updatedMembers[editIndex] = {
            email: newMemberEmail,
            role: newMemberRole,
            user_id: res?.data?._id,
          };
          setTeamMembers(updatedMembers);
          setEditIndex(null);
        } else {
          setTeamMembers([
            ...teamMembers,
            {
              email: newMemberEmail,
              role: newMemberRole,
              user_id: res?.data?._id,
            },
          ]);
        }
        setNewMemberEmail('');
        setNewMemberRole('');
        setAddMemberModal(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          const error = err?.response?.data?.message || err?.message;
          toas(error, 'error');
        }
      }
    }
  };

  // HANDLE EDIT
  const handleEditMember = (index: number) => {
    setNewMemberEmail(teamMembers[index].email);
    setNewMemberRole(teamMembers[index].role);
    setEditIndex(index);
    setAddMemberModal(true);
  };

  // HANDLE DELETE
  const handleDeleteMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    if (
      userType === 'Select Occupation' ||
      !teamName ||
      yesNoSelection === 'Are you competing as a team?'
    ) {
      return toas('Please fill up all fields', 'error');
    }
    // student
    if (userType === 'student') {
      if (!nameOfSchool || !degreeProgram || !yearLevel || !idNumber)
        return toas('Please fill up all fields', 'error');
    }
    // professional
    if (userType === 'professional') {
      if (!job || !companyOrganization || !yearOfExperience) {
        return toas('Please fill up all fields', 'error');
      }
    }
    try {
      await axios({
        method: 'post',
        url: '/product/save-team-for-contest-event',
        data: {
          occupation: userType,
          company_organization: companyOrganization,
          industry_experience: yearOfExperience,
          school_name: nameOfSchool,
          degree_program: degreeProgram,
          year_level: yearLevel,
          student_id_number: idNumber,
          team: yesNoSelection ? true : false,
          team_name: teamName,
          team_mates: teamMembers,
          event: productId,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      toas('Team successfully saved', 'success');
      navigate(`/view/event?id=${productId}`);
    } catch (err) {
      toas('Something went wrong please try again later', 'error');
    }
  };

  return (
    <div className="w-full bg-[#FAFBFC] min-h-screen">
      {/* NAVBAR SECTION */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="w-[95%] md:w-[700px] mx-auto  flex justify-center items-center py-8">
        <div className="p-5 bg-white rounded shadow-lg w-full">
          {/* TITLE */}
          <h1 className="text-[#333333] text-2xl font-bold text-center mb-8">
            Team Form
          </h1>
          {/* SELECT OCCUPATION DROPDOWN */}
          <Dropdown
            label=""
            selected={userType}
            options={['Professional', 'Student']}
            isOpen={isDropdownOpen}
            setIsOpen={setIsDropdownOpen}
            onSelect={setUserType}
          />
          {/* PROFESSIONAL FORM */}
          {userType === 'Professional' && (
            <ProfessionalForm
              job={job}
              setJob={setJob}
              companyOrganization={companyOrganization}
              setCompanyOrganization={setCompanyOrganization}
              yearOfExperience={yearOfExperience}
              setYearsOfExperience={setYearsOfExperience}
            />
          )}
          {/* STUDENT FORM */}
          {userType === 'Student' && (
            <StudentForm
              nameOfSchool={nameOfSchool}
              setNameOfSchool={setNameOfSchool}
              degreeProgram={degreeProgram}
              setDegreeProgram={setDegreeProgram}
              yearLevel={yearLevel}
              setYearLevel={setYearLevel}
              idNumber={idNumber}
              setIdNumber={setIdNumber}
            />
          )}
          {/* ARE YOU COMPETING AS A TEAM DROPDOWN */}
          <Dropdown
            label=""
            selected={yesNoSelection}
            options={['Yes', 'No']}
            isOpen={yesNoDropdownOpen}
            setIsOpen={setYesNoDropdownOpen}
            onSelect={setYesNoSelection}
          />
          {/* INPUT FIELD FOR TEAM NAME */}
          <InputTextField
            placeholder="Team Name"
            value={teamName}
            set={setTeamName}
          />
          <div className="w-full flex flex-col mb-8">
            {/* ADD MEMBER BUTTON */}
            <button
              className="bg-[#0D47A1] text-white font-light text-sm tracking-[1px] px-4 py-4 rounded-md shadow-md hover:opacity-90 transition mb-4 w-52"
              onClick={() => setAddMemberModal(true)}
            >
              Add Member
            </button>

            {/* TEAM MEMBER TABLE */}
            <table className="w-full border border-[#CFD8DC]">
              {/* TABLE HEAD */}
              <thead>
                <tr className="border border-[#CFD8DC]">
                  <th className="text-left w-1/2 p-2 text-sm">Email Address</th>
                  <th className="text-left w-1/4 p-2 text-sm">Role</th>
                  <th className="text-left w-1/4 p-2 text-sm">Action</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {teamMembers.map((member, index) => (
                  <tr key={index} className="border border-[#CFD8DC]">
                    {/* EMAIL CONTAINER */}
                    <td className="py-2 pl-1">{member.email}</td>

                    {/* ROLE CONTAINER */}
                    <td className="py-2">{member.role}</td>
                    <td className="py-2">
                      {/* EDIT BUTTON */}
                      <button
                        className="mr-2 text-white bg-[#0D47A1] w-20 py-2 rounded-md"
                        onClick={() => handleEditMember(index)}
                      >
                        Edit
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        className="bg-white border border-[#0D47A1] text-[#0D47A1] w-20 py-2 rounded-md"
                        onClick={() => handleDeleteMember(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* SUBMIT BUTTON */}
          <div className="w-full flex justify-center items-center">
            <button
              onClick={handleSubmit}
              className="bg-[#0D47A1] text-white w-52 py-3 rounded mt-4 tracking-[1px] font-light"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* ADD MEMBER MODAL */}
      {addMemberModal && (
        <AddMemberModal
          newMemberEmail={newMemberEmail}
          setNewMemberEmail={setNewMemberEmail}
          newMemberRole={newMemberRole}
          setNewMemberRole={setNewMemberRole}
          handleAddMember={handleAddMember}
          setAddMemberModal={setAddMemberModal}
        />
      )}
    </div>
  );
};

export default CreateTeam;
