import QRCode from "react-qr-code";
import Navbar from "../../components/Navbar"
import { useAppSelector } from "../../state/store"

const OwnedQrCode = () => {
    const user = useAppSelector(e => e.user.currentUser);
    return(
        <div className="class">
            <Navbar />

            <div className="w-[40%] mobile:w-[100%] laptop:w-[80%] bg-indigo-800 shadow border border-gray-300 ml-[50%] translate-x-[-50%] p-[30px] flex flex-col items-center rounded">
              {/* <p className="text-white text-xl mb-[10px]">
                {eventdata?.eventData?._id?.title}
              </p> */}

            
                <>
                  <p className="text-gray-400 mb-[10px]">
                    This QR code serves as your unique ID
                  </p>
                  <div className="w-[70%] p-[20px] bg-white rounded mb-[5px]">
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={user?._id}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <p className="text-gray-500">
                    {user?._id}
                  </p>
                </>
              

              <p className="mt-[20px] text-2xl font-semibold text-white">
                {user?.fname} {user?.lname}
              </p>

            </div>
        </div>
    )
}

export default OwnedQrCode