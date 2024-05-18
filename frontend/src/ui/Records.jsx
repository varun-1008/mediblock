import { useState } from "react";
import Modal from "./Modal";
import Record from "./Record";

function Records({ recordsData, buttonTitle, buttonFunction }) {
  const [selected, setSelected] = useState(null);
  const [isExpanded, setIsExpanded] = useState(null);

  const { address, records } = recordsData;

  function handleExpand(index) {
    setIsExpanded(isExpanded === index ? null : index);
  }

  function onClose() {
    setSelected(null);
  }

  // function handleView({address, linkIndex, recordIndex}) {
  //   setSelected({
  //     address,
  //     linkIndex,
  //     recordIndex
  //   })
  // }

  return (
    <>
      <h1>Records</h1>
      {records.map((linkRecords, index) => {
        return (
          <div key={index}>
            {linkRecords.slice(0, 1).map((record) => {
              return (
                <div key={record.time}>
                  <p onClick={() => handleExpand(index)}>{record.title}</p>
                  <button
                    onClick={() =>
                      setSelected({
                        address,
                        linkIndex: record.linkIndex,
                        recordIndex: record.recordIndex,
                      })
                    }
                  >
                    View
                  </button>
                  <button onClick={() => buttonFunction({linkIndex : record.linkIndex})}>{buttonTitle}</button>
                </div>
              );
            })}

            {isExpanded === index &&
              linkRecords.slice(1).map((record) => {
                return (
                  <div key={record.time}>
                    <p>{record.title}</p>
                    <button
                      onClick={() =>
                        setSelected({
                          address,
                          linkIndex: record.linkIndex,
                          recordIndex: record.recordIndex,
                        })
                      }
                    >
                      View
                    </button>
                  </div>
                );
              })}
          </div>
        );
      })}

      {selected && (
        <Modal onClose={onClose}>
          <Record recordData={{ address, ...selected }} />
        </Modal>
      )}
    </>
  );
}

export default Records;
