import { getStorage, ref, listAll, getDownloadURL, list } from "firebase/storage";
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './Graph.json'; // Assuming you have the data in a separate file

const DFgraph = () => {
	const svgRef = useRef();

	const fetchData = async () => {
		const storage = getStorage();
		const storageRef = ref(storage, 'music/');

		let nodes = [];
		let links = [];



		const listFilesAndDirectories = async (parentRef) => {
			console.log(parentRef.name);
			nodes.push({ id: parentRef.name, group: 1, radius: 2 });
			const { items, prefixes } = await listAll(parentRef);

			items.map((item) => {
				nodes.push({ id: item.name, group: 1, radius: 2 });
				// links[item.name] = { source: parentRef.name, target: item.name, value: 1 };
			});



			for (const node of nodes) {
				console.log(node);
			}
			console.log('NEXT FUCKING THING');


			// await Promise.all(
			// 	prefixes.map(async (dirRef) => {
			// 		nodes.push({ id: dirRef.name, group: 1, radius: 2 });
			// 		listFilesAndDirectories(dirRef);
			// 	})
			// );
		};

		for (const itemRef of (await listAll(storageRef)).prefixes) {
			await listFilesAndDirectories(itemRef);
		}

		console.log('FINAL THING');

		for (const node of nodes) {
			console.log(node);
		}

		// const fileTree = await listFilesAndDirectories(storageRef);
		// console.log(JSON.stringify(fileTree.directories[0], null, 2));
		// console.log(JSON.stringify(nodes, null, 2));
		// console.log(nodes);
	};


	useEffect(() => {



		// #region d3 code config
		// base window config for d3
		const width = window.innerWidth - 10;
		const height = window.innerHeight - 10;
		const color = d3.scaleOrdinal(d3.schemeCategory10);
		// save the links and nodes in variables
		const links = data.links.map(d => ({ ...d }));
		const nodes = data.nodes.map(d => ({ ...d }));


		// configure the d3 simulation forces
		const simulation = d3.forceSimulation(nodes)
			.force('link', d3.forceLink(links).id(d => d.id))
			.force('charge', d3.forceManyBody().strength(-100))
			.force('x', d3.forceX())
			.force('y', d3.forceY());




		// create the svg element window
		const svg = d3.select(svgRef.current)
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
			.attr('style', 'max-width: 100%; height: auto; border: 1px solid black;');



		// remove all elements in the svg from previous renderings
		svg.selectAll("*").remove();

		const g = svg.append('g');


		// create the link elements
		const link = g.append("g")
			.attr("stroke", "#4287f5") //type of line and color
			.attr("stroke-opacity", 0.6)  //opacity of the line
			.selectAll("line") // select all preexisting lines
			.data(links) // select the data to be used
			.join("line") // create new lines with the data
			.attr("stroke-width", d => Math.sqrt(d.value)); //set the width of the line


		const node = g.append("g")
			.attr("stroke", "#000")
			.attr("stroke-width", 0.5)
			.selectAll("circle")
			.data(nodes)
			.join("circle")
			.attr("r", 5)
			.attr("fill", d => color(d.group));

		node.append("title")
			.text(d => d.id);
		// #endregion


		// #region zoom behavior
		// Create a zoom behavior
		const zoom = d3.zoom()
			.scaleExtent([0.1, 10]) // This controls the minimum and maximum zoom scale
			.on('zoom', (event) => {
				if (event.sourceEvent && event.sourceEvent.type === 'wheel' && event.sourceEvent.deltaMode === 0) {
					g.transition()
						.duration(100) // duration of the transition in milliseconds
						.attr('transform', event.transform);
				} else {
					g.attr('transform', event.transform);
				}
			});

		// Add the zoom behavior to the SVG
		svg.call(zoom);
		// #endregion


		// #region node hover
		// Create a div for the tooltip
		var tooltip = d3.select("body").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);

		node.on("mouseover", function (event, d) {
			tooltip.transition()
				.duration(200)
				.style("opacity", .9);
			tooltip.html(d.id)
				.style("left", (event.pageX) + "px")
				.style("top", (event.pageY - 28) + "px");
		})
			.on("mouseout", function (d) {
				tooltip.transition()
					.duration(500)
					.style("opacity", 0);
			});
		// #endregion


		// #region drag behavior
		// Add a drag behavior.
		node.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

		// Set the position attributes of links and nodes each time the simulation ticks.
		simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);

			node
				.attr("cx", d => d.x)
				.attr("cy", d => d.y);
		});

		function dragstarted(event) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		// Update the subject (dragged node) position during drag.
		function dragged(event) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		// Restore the target alpha so the simulation cools after dragging ends.
		// Unfix the subject position now that it’s no longer being dragged.
		function dragended(event) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}
		// #endregion


		// #region resize on window resize
		// Function to update width and height
		const updateSize = () => {
			const width = window.innerWidth - 10;
			const height = window.innerHeight - 10;
			const svg = d3.select(svgRef.current);
			svg.attr('width', width)
				.attr('height', height)
				.attr('viewBox', [-width / 2, -height / 2, width, height]);
		};


		// Update size when component mounts
		updateSize();

		// Add event listener for resize events
		window.addEventListener('resize', updateSize);
		// #endregion


		// #region Disable scrollbars
		document.body.style.overflow = 'hidden';
		// #endregion



		return () => {
			// Remove event listener when component unmounts
			window.removeEventListener('resize', updateSize);
			document.body.style.overflow = 'auto';
			simulation.stop();
			fetchData();
		};
	}, []); // add dependencies if necessary




	return <svg ref={svgRef} />;
};

export default DFgraph;