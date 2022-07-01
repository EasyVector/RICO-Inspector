import React, {useState} from 'react'
import TreeView, {NodeInfo} from "./TreeView";


function Tree(props:{
    rawNodeData:NodeInfo,
    inspectInfo:(info:NodeInfo)=>void,
	hoverInfo:(info:NodeInfo)=>void
}) {
    const [clickedToken, setClickedToken] = useState("-1")

    let clickedCallback = (token:string) => {
        setClickedToken(token)
    }

    return (
        <>
            <TreeView rawNodeData={props.rawNodeData}
                      inspectInfo={props.inspectInfo}
                      clickedToken={clickedToken}
                      token={"0"}
                      hoverInfo={props.hoverInfo}
                      clickStatusCallBack={clickedCallback}/>
        </>
    )
}

export default Tree;
