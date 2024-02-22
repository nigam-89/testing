import React, { useState, useEffect, useMemo, useRef } from "react";
import Mark from "mark.js";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";
import NotificationButton from "../NotificationButton/NotificationButton";
import axios from "axios";
import { BASE_URL } from "../../services/apis";

export default function Search() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const timerRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  // const markInstance = useMemo(() => new Mark(document.body), []);

  const debounceSearch = (f, interval) => {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(f(...args)), interval);
      });
    };
  };

  const makeApi = debounceSearch((query) => {
    axios
      .get(`${BASE_URL}/api/v1/search?value=${query}`)
      .then((res) => {
        setSearchedData(res.data.data);
        onOpen();
      })
      .catch((err) => console.log(err));
  }, 300);

  const handleSearchChange = (query) => {
    setSearchTerm(query);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => makeApi(query), 300);
  };

  // useEffect(() => {
  //   if (searchTerm.trim() !== "") {
  //     markInstance.unmark();
  //     markInstance.mark(searchTerm);
  //   } else {
  //     markInstance.unmark();
  //   }
  // }, [searchTerm, markInstance]);

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  return (
    <>
      <div className="hidden relative md:flex items-center justify-center gap-2 py-2 mb-2  px-4  z-50">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="rounded-xl py-1 px-2 focus:outline-none border-2 border-gray-300
          font-[Roboto] tracking-wide font-[400]"
        />
        <div className="absolute top-[1rem] right-[1.5rem] text-[#1a3777]">
          <FaSearch />
        </div>
      </div>

      <div className="block md:hidden">
        <button className="cursor-pointer" onClick={onOpen} ref={btnRef}>
          <FaSearch />
        </button>
      </div>

      <NotificationButton />

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="outside"
        // size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div
              onClick={() => {
                setSearchTerm("");
                setSearchedData([]);
                onClose();
              }}
            >
              <ModalCloseButton />
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="flex relative items-center justify-center gap-2 py-2 mb-2 px-4 md:hidden z-50">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="rounded-xl py-1 px-2 focus:outline-none border-2 border-gray-300
          font-[Roboto] tracking-wide font-[400] w-full"
              />
              <div className="absolute top-[1.1rem] right-[1.6rem] text-[#1a3777]">
                <FaSearch />
              </div>
            </div>
            <div className="px-1 mt-3 md:mt-0 overflow-y-auto max-h-[70vh]">
              {searchedData.map((data) => (
                <div>
                  <p className="text-[1.3rem] font-semibold">
                    {Object.keys(data)[0]}
                  </p>
                  {Object.values(data)[0].map((val) => (
                    <p
                      className="p-1 bg-[#e6e6e6] cursor-pointer my-1.5 rounded"
                      onClick={() => {
                        const d = Object.keys(data)[0];
                        if (d === "Top Stories") navigate("/top-stories");
                        else if (d === "Opinion Box") navigate("/opinion-box");
                        else window.open("https://metalogicpms.com/");
                      }}
                    >
                      {val?.heading ?? val.title}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
