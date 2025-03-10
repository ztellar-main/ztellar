import React from "react";

interface AddMemberModalProps {
  newMemberEmail: string;
  setNewMemberEmail: (value: string) => void;
  newMemberRole: string;
  setNewMemberRole: (value: string) => void;
  handleAddMember: () => void;
  setAddMemberModal: (value: boolean) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  newMemberEmail,
  setNewMemberEmail,
  newMemberRole,
  setNewMemberRole,
  handleAddMember,
  setAddMemberModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        {/* TITLE */}
        <h2 className="text-lg font-bold mb-4">Add Team Member</h2>

        {/* INPUT FOR EMAIL ADDRESS */}
        <input
          type="text"
          placeholder="Member's Email Address"
          value={newMemberEmail}
          onChange={(e) => setNewMemberEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2 font-light tracking-[1px] focus:placeholder-transparent focus:outline-none"
        />

        {/* INPUT FOR ROLE */}
        <input
          type="text"
          placeholder="Role"
          value={newMemberRole}
          onChange={(e) => setNewMemberRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 font-light tracking-[1px] focus:placeholder-transparent focus:outline-none"
        />
        <div className="flex justify-between space-x-2">
          <button
            className="border border-[#0D47A1] text-[#0D47A1] tracking-[1px] font-light px-4 py-2 rounded w-1/2"
            onClick={() => setAddMemberModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#0D47A1] tracking-[1px] font-light text-white px-4 py-2 rounded w-1/2"
            onClick={handleAddMember}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
