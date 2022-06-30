import React from "react";
import "./TreeView.css"
export type NodeInfo = {
	"scrollable-horizontal": boolean,
	"draw": boolean,
	"ancestors": string[],
	"clickable": boolean,
	"pressed": string,
	"focusable": boolean,
	"long-clickable": boolean,
	"enabled": boolean,
	"bounds": number[],
	"visibility": string,
	"children":NodeInfo[],
	"content-desc": (string | null)[],
	"rel-bounds": number[],
	"focused": boolean,
	"selected": boolean,
	"scrollable-vertical": boolean,
	"adapter-view": boolean,
	"abs-pos": boolean,
	"pointer": string,
	"class": string,
	"visible-to-user": boolean
}

// export type NodeInfo = {[key: string]: any}

function TreeView(props: {
	rawNodeData: NodeInfo,
	inspectInfo:(nodeInfo:NodeInfo)=>void,
	token:string,
	clickStatusCallBack:(token:string)=>void,
	clickedToken:string
}) {

	let _onPress = () => {
		props.inspectInfo(props.rawNodeData)
		props.clickStatusCallBack(props.token)
	}

	let initChildren = (childrenNodes:NodeInfo[]|undefined) => {
		let child:NodeInfo
		let index:number = 0
		let childrenJSX:JSX.Element[] = []
		if (childrenNodes === undefined){
			return childrenJSX
		}
		for (child of childrenNodes){
			let childJSX:JSX.Element =
				<TreeView
					rawNodeData={child}
					inspectInfo={props.inspectInfo}
					token={props.token+index.toString()}
					clickStatusCallBack={props.clickStatusCallBack}
					clickedToken={props.clickedToken}
				/>;
			childrenJSX.push(childJSX)
			index+=1
		}
		return childrenJSX;
	}

	return (
		<ul className="tree-ul">
			<div className={`hover:cursor-pointer max-w-fit 
			${props.token === props.clickedToken ? "bold" : ""}`} onClick={_onPress}>
				{props.rawNodeData["class"]}
			</div>
			<ul className="tree-ul" >{initChildren(props.rawNodeData.children)}</ul>
		</ul>
	)
}

export default TreeView;
