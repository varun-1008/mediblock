function Recordsitem({ address, record, onView, handleExpand }) {
  let expand = {};
  if (handleExpand)
    expand = {
      onClick: () => {
        handleExpand(record.linkIndex);
      },
    };

  return (
    <div key={record.time}>
      <p {...expand}>{record.title}</p>
      <button
        onClick={() =>
          onView({
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
}

export default Recordsitem;
