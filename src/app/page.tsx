"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [errors, setErrors] = useState({
    day: "",
    month: "",
    year: "",
    invalidDate: "",
  });

  const [calculatedAge, setCalculatedAge] = useState({
    years: null,
    months: null,
    days: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value;

    // ensuring the input value is a number
    const numericValue = /^\d*$/.test(value) ? parseInt(value, 10) : "";

    switch (type) {
      case "day":
        setDay(value === "" ? "" : isNaN(numericValue) ? day : numericValue);
        setErrors((prevErrors) => ({
          ...prevErrors,
          day: "",
          invalidDate: "",
        }));
        break;
      case "month":
        setMonth(
          value === "" ? "" : isNaN(numericValue) ? month : numericValue
        );
        setErrors((prevErrors) => ({
          ...prevErrors,
          month: "",
          invalidDate: "",
        }));
        break;
      case "year":
        setYear(value === "" ? "" : isNaN(numericValue) ? year : numericValue);
        setErrors((prevErrors) => ({
          ...prevErrors,
          year: "",
          invalidDate: "",
        }));
        break;
      default:
        break;
    }
  };

  const calculateAge = () => {
    if (day && month && year) {
      const birthDate = new Date(year, month - 1, day);
      const currentDate = new Date();

      if (birthDate > currentDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          invalidDate: "Must be in the past",
        }));
        setCalculatedAge({
          years: null,
          months: null,
          days: null,
        });
        return;
      }

      let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
      let ageMonths = currentDate.getMonth() - birthDate.getMonth();
      let ageDays = currentDate.getDate() - birthDate.getDate();

      if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += 30; // Assuming a month has 30 days for simplicity
      }

      if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
      }

      setCalculatedAge({
        years: ageYears,
        months: ageMonths,
        days: ageDays,
      });
    } else {
      setCalculatedAge({
        years: null,
        months: null,
        days: null,
      });
    }
  };

  const handleCalculateAge = () => {
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    const isValidDate =
      !isNaN(dayInt) &&
      !isNaN(monthInt) &&
      !isNaN(yearInt) &&
      dayInt >= 1 &&
      dayInt <= 31 &&
      monthInt >= 1 &&
      monthInt <= 12 &&
      yearInt >= 1;

    if (!day || !month || !year) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        day: day ? "" : "This field is required",
        month: month ? "" : "This field is required",
        year: year ? "" : "This field is required",
        invalidDate: "",
      }));
    } else if (!isValidDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        invalidDate: "Invalid date",
      }));
    } else {
      // Additional date validation
      const maxDaysInMonth = new Date(yearInt, monthInt, 0).getDate();
      const isValidDay = dayInt >= 1 && dayInt <= maxDaysInMonth;

      if (!isValidDay) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          invalidDate: "Must be a valid date",
        }));
      } else {
        setErrors({
          day: "",
          month: "",
          year: "",
          invalidDate: "",
        });
        calculateAge();
      }
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center flex-col items-center my-auto">
        <div className="bg-white h-[35em] w-[38%] rounded-t-lg rounded-bl-lg rounded-br-[150px] container">
          <form action="" className="mb-[30px]">
            <div className="flex p-8">
              <div className="m-4">
                <label
                  className={`block uppercase text-sm mb-2 font-bold ${
                    errors.day ? "text-red-500" : "text-[#555353]"
                  }`}
                  htmlFor="dayInput"
                >
                  day
                </label>
                <input
                  className={`outline outline-1 ${
                    errors.day ? "outline-red-500" : "outline-[#f0f0f0]"
                  } rounded-sm w-[95px] h-[45px] p-[5px] placeholder:uppercase placeholder:pl-2 placeholder:font-extrabold focus:outline-[#854dff]`}
                  type="text"
                  name=""
                  id="dayInput"
                  placeholder="dd"
                  value={day}
                  onChange={(e) => handleInputChange(e, "day")}
                />
                {errors.day && (
                  <p className="text-red-500 text-[10px] mt-[5px] italic">
                    {errors.day}
                  </p>
                )}
                {errors.invalidDate && (
                  <p className="text-red-500 text-[10px] mt-[5px] italic error">
                    {errors.invalidDate}
                  </p>
                )}
              </div>
              <div className="m-4">
                <label
                  className={`block uppercase text-sm mb-2 font-bold ${
                    errors.month ? "text-red-500" : "text-[#555353]"
                  }`}
                  htmlFor="monthInput"
                >
                  month
                </label>
                <input
                  className={`outline outline-1 ${
                    errors.month ? "outline-red-500" : "outline-[#f0f0f0]"
                  } rounded-sm w-[95px] h-[45px] p-[5px] placeholder:uppercase placeholder:pl-2 placeholder:font-extrabold focus:outline-[#854dff]`}
                  type="text"
                  name=""
                  id="monthInput"
                  placeholder="mm"
                  value={month}
                  onChange={(e) => handleInputChange(e, "month")}
                />
                {errors.month && (
                  <p className="text-red-500 text-[10px] mt-[5px] italic">
                    {errors.month}
                  </p>
                )}
              </div>
              <div className="m-4">
                <label
                  className={`block uppercase text-sm mb-2 font-bold ${
                    errors.year ? "text-red-500" : "text-[#555353]"
                  }`}
                  htmlFor="yearInput"
                >
                  year
                </label>
                <input
                  className={`outline outline-1 ${
                    errors.year ? "outline-red-500" : "outline-[#f0f0f0]"
                  } rounded-sm w-[95px] h-[45px] p-[5px] placeholder:uppercase placeholder:pl-2 placeholder:font-extrabold focus:outline-[#854dff]`}
                  type="text"
                  name=""
                  id="yearInput"
                  placeholder="yyyy"
                  value={year}
                  onChange={(e) => handleInputChange(e, "year")}
                />
                {errors.year && (
                  <p className="text-red-500 text-[10px] mt-[5px] italic">
                    {errors.year}
                  </p>
                )}
              </div>
            </div>
            <div className="flex mx-[3em]">
              <hr className="w-[80%] relative" />
              <button
                type="button"
                className="bg-[#854dff] w-[50px] h-[50px] rounded-full flex justify-center items-center mt-[-25px] hover:bg-[#141414]"
                onClick={handleCalculateAge}
              >
                <Image
                  src="/imgs/icon-arrow.svg"
                  alt="fvyf"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </form>

          {/* CALCULATED AGE */}
          <div className="ml-[3em] calculated-age">
            <p className="text-[50px] font-extrabold italic text-[#854dff]">
              {calculatedAge.years !== null ? calculatedAge.years : "- -"}{" "}
              <span className="text-black">years</span>
            </p>
            <p className="text-[50px] font-extrabold italic text-[#854dff]">
              {calculatedAge.months !== null ? calculatedAge.months : "- -"}{" "}
              <span className="text-black">months</span>
            </p>
            <p className="text-[50px] font-extrabold italic text-[#854dff]">
              {calculatedAge.days !== null ? calculatedAge.days : "- -"}{" "}
              <span className="text-black">days</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
