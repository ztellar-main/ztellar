import { useState } from 'react';

// COMPONENT IMPORTS
import Dropdown from './set-reminder-components/Dropdown';
import InputField from './set-reminder-components/InputField';
import CustomDaysSelection from './set-reminder-components/CustomDaysSelection';

// DATA IMPORT
import {
  options,
  durationOptions,
  weekdays,
  weekends,
} from './set-reminder-components/setReminderData';
import axios from 'axios';
import { useAppSelector } from '../../../state/store';
import toas from '../../../utils/toas';

type SetReminderProps = {
  courseTitle: string;
  courseId: string;
  refetch: any;
  reminder: any;
};

// START
const EditReminder = ({
  courseTitle,
  courseId,
  refetch,
  reminder,
}: SetReminderProps) => {
  const { token } = useAppSelector((state: any) => state?.user);
  const [selectedOption, setSelectedOption] = useState('Select your Schedule');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('Select duration');
  const [isOpen, setIsOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [showCustomDays, setShowCustomDays] = useState(false);

  console.log({
    selectedDays,
    selectedTime,
    selectedDuration,
    courseTitle,
    courseId,
  });

  // FUNCTION TO SELECT DAY
  const toggleDaySelection = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // FUNCTION FOR SUBMIT SELECTED DAYS
  const handleSubmitCustomDays = () => {
    if (selectedDays.length > 0) {
      setSelectedOption(`${selectedDays.join(', ')}`);
    } else {
      setSelectedOption('No Days Selected, Please select atleast one');
    }
    setShowCustomDays(false);
  };

  //   handle submit
  const handleSubmit = async () => {
    if (
      !selectedDays ||
      !selectedTime ||
      selectedDuration === 'Select duration'
    ) {
      return toas('Please fill up all the fields', 'error');
    }
    try {
      await axios({
        method: 'PUT',
        url: '/reminder/update-reminder',
        data: {
          days: selectedDays,
          time: selectedTime,
          expiry: selectedDuration,
          courseTitle,
          courseId,
          reminderId: reminder?._id,
        },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      toas('Reminder Successfully Set', 'success');
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex h-screen">
      {/* RIGHT CONTAINER AND MAIN CONTAINER */}
      <div className="flex-1 bg-[#FAFBFC]">
        {/* MAIN CONTAINER */}
        <div className="w-full py-5 flex justify-center">
          <div className="flex flex-col w-2/5 bg-white p-5 rounded-lg">
            {/* SECTION TITLE */}
            <h1 className="text-xl font-semibold text-[#333333]">
              Set your Learning Pathway with Ztellar Calendar
            </h1>

            {/* DROPDOWN FOR SELECT SCHEDULE */}
            <Dropdown
              label="Please share your availability with us using the calendar below so
            we can help you kickstart your digital course effectively."
              selected={selectedOption}
              options={options}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onSelect={(option: any) => {
                setSelectedOption(option);
                if (option === 'Weekdays (Monday - Friday)') {
                  setSelectedDays(weekdays);
                  setShowCustomDays(false);
                } else if (option === 'Weekends (Saturday - Sunday)') {
                  setSelectedDays(weekends);
                  setShowCustomDays(false);
                } else {
                  setSelectedDays([]);
                  setShowCustomDays(true);
                }
              }}
            />

            {/* CONTAINER FOR CUSTOM DAYS SELECTION */}
            {showCustomDays && (
              <CustomDaysSelection
                selectedDays={selectedDays}
                toggleDaySelection={toggleDaySelection}
                handleSubmitCustomDays={handleSubmitCustomDays}
              />
            )}

            {/* INPUT FIELD FOR SET YOUR LEARNING TIME SECTION */}
            <InputField
              label="Set your learning time"
              type="time"
              value={selectedTime}
              onChange={(e: any) => setSelectedTime(e.target.value)}
            />

            {/* DROPDOWN FOR DURATION SELECTION SECTION */}
            <Dropdown
              label="How long do you plan to complete the course?"
              selected={selectedDuration}
              options={durationOptions}
              isOpen={isDurationOpen}
              setIsOpen={setIsDurationOpen}
              onSelect={setSelectedDuration}
            />

            {/* BUTTON CONTAINER */}
            <div className="p-5 flex justify-center items-center">
              {/* SUBMIT/SEND BUTTON */}
              <button
                onClick={handleSubmit}
                className="bg-[#2F2F2F] text-white text-base font-light px-14 py-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReminder;
