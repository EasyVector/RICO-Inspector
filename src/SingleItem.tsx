import React, {useRef, useState} from "react";
import axios from "axios";
import "./SinglePanel.css"
import {NodeInfo} from "./TreeView";
import Tree from "./Tree";

type Item = {
	value: string,
	label: string
}

function SingleItem(props: Item) {
	const myRef = useRef<HTMLCanvasElement>(null);
	const [jsonData, setJsonData] = useState<NodeInfo>();
	const [nodeData, setNodeData] = useState<NodeInfo>();
	const [imageData, setImageData] = useState<HTMLImageElement>();
	const [paddingXData] = useState(1440)
	const [paddingYData] = useState(2560)

	let inspectInfo = (nodeInfo: NodeInfo) => {
		setNodeData(nodeInfo);
		let x = nodeInfo["bounds"][0]+paddingXData,
			y = nodeInfo["bounds"][1]+paddingYData,
			w = nodeInfo["bounds"][2]-nodeInfo["bounds"][0],
			h = nodeInfo["bounds"][3]-nodeInfo["bounds"][1];
		let current = myRef.current
		if (current!=null)
		{
			let ctx = current.getContext('2d');
			let rectangle = new Path2D();
			rectangle.rect(x, y, w, h);
			if (ctx!==null) {
				ctx.clearRect(0, 0, current.width, current.height);
				if (imageData!==undefined)
					ctx.drawImage(imageData, paddingXData, paddingYData, 1440, 2560);
				ctx.lineWidth = 15;
				ctx.strokeStyle = 'red';
				ctx.stroke(rectangle);
			}
		}
	}

	React.useEffect(() => {
		axios({
			method: 'get',
			url: 'http://127.0.0.1:8082/api/v1/get_one_data',
			responseType: 'json',
			params: {
				data_id: props.label
			}
		})
		.then((response) => {
			let current = myRef.current
			let context = current?.getContext('2d');
			let image = new Image();
			let realWidth:number = 1440
			let realHeight:number = 2560
			image.src = "data:image/png;base64," + response.data.img_data;
			setImageData(image)
			image.onload = function () {
				current?.setAttribute("width", (realWidth*3).toString())
				current?.setAttribute("height", (realHeight*3).toString())
				context?.drawImage(image, paddingXData, paddingYData, realWidth, realHeight);
			};
			setJsonData(JSON.parse(response.data.json_data)["activity"]["root"])
		});
	}, [props.label])

	let prepareTable = (tableData:NodeInfo) => {
		let key: string
		let tableItems :JSX.Element[] = []
		let index = 0
		let keys = Object.keys(tableData)
		keys = keys.sort()
		for (key of keys){
			let keyOfNodeInfo:keyof NodeInfo = key as keyof NodeInfo
			let tableItem: JSX.Element =
				<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
					<td className={`px-3 py-1 font-bold dark:text-white whitespace-nowrap ${key === "clickable" || key === "long-clickable" ? "text-red-500" : "text-gray-900"}`}>{key}</td>
					<td className={`px-3 py-1 break-all font-bold ${tableData[keyOfNodeInfo].toString() === "true" ? "text-red-500" : "text-gray-900"}`}>
						{tableData[keyOfNodeInfo].toString()}
					</td>
				</tr>
			tableItems.push(tableItem)
			index += 1
		}
		return tableItems
	}

	return (
		<div className="container p-2 mx-auto bg-blue-50 rounded-b-xl shadow-lg my-8 rounded-md">
			<div className="text-center mb-2 font-mono font-bold">
				<h3>You are inspecting the record of '{props.value}' inside RICO.</h3>
			</div>
			<div className="flex flex-row">
				<div className="Canvas-Panel basis-1/3 shadow-md ">
					<div className="canvas-wrapper">
						<canvas className="My-Canvas" ref={myRef}/>
					</div>
				</div>
				<div className="Json-Panel mx-2 basis-1/3 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-auto shadow-md sm:rounded-lg">
					{jsonData!==undefined && <Tree rawNodeData={jsonData} inspectInfo={inspectInfo}/>}
				</div>
				<div className="Json-Panel basis-1/3 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300  overflow-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th className="px-3 py-3">Property</th>
								<th className="px-3 py-3">Value</th>
							</tr>
						</thead>
						<tbody>
						{nodeData!==undefined && prepareTable(nodeData)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default SingleItem;
