import React, { useEffect, useRef } from "react";

function AlwaysScrollToBottom(){
  const elementRef = useRef();
  
  useEffect(() => elementRef.current.scrollIntoView());

  return <div ref={elementRef} />;
}

export default AlwaysScrollToBottom;
