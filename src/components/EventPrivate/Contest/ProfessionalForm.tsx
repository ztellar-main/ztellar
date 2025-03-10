import InputTextField from './InputTextField';

type Props = {
  job: any;
  setJob: any;
  companyOrganization: any;
  setCompanyOrganization: any;
  yearOfExperience: any;
  setYearsOfExperience: any;
};

const ProfessionalForm = ({
  job,
  setJob,
  companyOrganization,
  setCompanyOrganization,
  yearOfExperience,
  setYearsOfExperience,
}: Props) => {
  return (
    <div>
      <h3 className="mb-3">Professional</h3>

      <InputTextField
        placeholder="Job Title/Position"
        value={job}
        set={setJob}
      />
      <InputTextField
        placeholder="Company/Organization"
        value={companyOrganization}
        set={setCompanyOrganization}
      />
      <InputTextField
        placeholder="Industry Experience (Years)"
        value={yearOfExperience}
        set={setYearsOfExperience}
      />
    </div>
  );
};

export default ProfessionalForm;
