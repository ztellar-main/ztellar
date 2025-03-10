import InputTextField from './InputTextField';

type Props = {
  nameOfSchool: any;
  setNameOfSchool: any;
  degreeProgram: any;
  setDegreeProgram: any;
  yearLevel: any;
  setYearLevel: any;
  idNumber: any;
  setIdNumber: any;
};

const StudentForm = ({
  nameOfSchool,
  setNameOfSchool,
  degreeProgram,
  setDegreeProgram,
  yearLevel,
  setYearLevel,
  idNumber,
  setIdNumber,
}: Props) => {
  return (
    <div>
      <h3 className="mb-3">Student</h3>

      <InputTextField
        placeholder="Name of School"
        value={nameOfSchool}
        set={setNameOfSchool}
      />
      <InputTextField
        placeholder="Degree Program"
        value={degreeProgram}
        set={setDegreeProgram}
      />
      <InputTextField
        placeholder="Year Level"
        value={yearLevel}
        set={setYearLevel}
      />
      <InputTextField
        placeholder="ID Number"
        value={idNumber}
        set={setIdNumber}
      />
    </div>
  );
};

export default StudentForm;
