import { FallingLines } from "react-loader-spinner"

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <FallingLines color="#1F2937" width="150" visible={true} />
    </div>
  );
}

export default Spinner