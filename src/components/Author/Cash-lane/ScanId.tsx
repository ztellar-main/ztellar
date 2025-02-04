type Props = {
  setQr: any;
  setComponentState: any;
};

const ScanId = ({ setQr, setComponentState }: Props) => {
  return (
    <div className="">
      <h1 className="text-center mb-4">Scan Id</h1>
      <input
        type="text"
        placeholder="Scan-ID"
        className="border px-4 py-2 w-[500px] outline-none ml-[50%] translate-x-[-50%] mb-4"
        onChange={(e: any) => setQr(e.target.value)}
      />
      <button onClick={() => setComponentState("choose-reg-type")} className="ml-[50%] translate-x-[-50%] bg-blue-900 px-4 py-2 rounded text-white">
        Next
      </button>
    </div>
  );
};

export default ScanId;
