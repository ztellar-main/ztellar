import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Total = () => {
  const { data } = useQuery({
    queryKey: ["TOTAL"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: "/users/author-sum",
      });
      return res;
    },
  });

  const authorPSME = data?.data?.PSME?.map((i: any) => i.author_payment).reduce(
    (a: any, b: any) => a + b
  );

  const authorJPSME = data?.data?.JPSME?.map(
    (i: any) => i.author_payment
  ).reduce((a: any, b: any) => a + b);
  return (
    <div>
      <p className="class">10th PSME Luzon Regional Conference 2024</p>
      <p className="class">Author fee: {Math.floor(authorPSME)}</p>

      <p className="class">10th PSME Luzon Regional Conference 2024</p>
      <p className="class">Author fee: {Math.floor(authorJPSME)}</p>
    </div>
  );
};

export default Total;
