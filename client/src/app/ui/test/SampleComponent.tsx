import { FunctionComponent } from "react";


const FrameHeader: FunctionComponent = () => {
  return (
    <div className="w-full relative rounded-[20px] bg-black shadow-[30px_30px_80px_rgba(109,_125,_147,_0.2)] flex flex-col items-center justify-start py-[38px] px-5 box-border gap-[18px] text-left text-3xs text-white font-dm-sans">
      <header className="self-stretch flex flex-row items-center justify-between py-0 px-[18px] text-left text-[24px] text-skyblue font-dm-sans">
        <h1 className="m-0 relative text-inherit tracking-[-0.02em] leading-[24px] font-medium font-inherit">
          Add Transaction
        </h1>
        <img
          className="h-[30px] w-[30px] relative"
          loading="eager"
          alt=""
          src="/iconlyregularlightclose-square.svg"
        />
      </header>
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-[18px]">
        <div className="flex flex-row items-start justify-start">
          <button className="cursor-pointer [border:none] p-1.5 bg-darkslateblue w-[101px] rounded-6xs flex flex-row items-center justify-center box-border z-[1]">
            <div className="relative text-3xs tracking-[-0.02em] leading-[14px] font-medium font-dm-sans text-white text-left">
              Expense
            </div>
          </button>
          <div className="rounded-6xs bg-gray flex flex-row items-center justify-center py-1.5 pr-[29px] pl-[31px] ml-[-17px]">
            <div className="relative tracking-[-0.02em] leading-[14px] whitespace-pre-wrap">
              {" "}
              Income | Transfer
            </div>
          </div>
        </div>
      </div>
      <section className="self-stretch flex flex-row items-start justify-start py-0 px-[18px]">
       {/* <ChooseDateLabel />*/}
      </section>
    </div>
  );
};

export default FrameHeader;