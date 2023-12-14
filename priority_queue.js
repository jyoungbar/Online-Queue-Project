//Priority Queue Class

//stores cookieID, name, and number of times spoken for each speaker
class Speaker {
	constructor(name, tallies) {
		this.name = name;
		this.tallies = tallies;
		// this.cookieID = cookieID;
	}
}

//functions for traversing array as if its a tree
function get_parent(index) {return (index-1) / 2 | 0;}
function get_left_child(index) {return 2*index + 1;}
function get_right_child(index) {return 2*index + 2;}

//Priority queue to keep track of speakers on the queue
// class PriorityQueue {
function PriorityQueue() {

	// constructor(queueName) {
		// this.queueName = queueName;
	this.items = [];

	// key: name
	// value: [int tallies, bool isInItems]
	this.record = new Map();
	// }
	this.isClosed = false;
	this.isVoting = false;
	this.isRanked = false;
	// this.votes = [0,0,0];
	this.voteOptions = [];
	this.votes = []; //new Map();
	// this.totalVotes = 0;

	this.add = (name) => {
		//check if speaker is already in items
		// console.log(this.record.get(name));
		if(!this.record.has(name) || !this.record.get(name)[1]) {

			var tallies = 0;
			if(this.record.has(name)) {
				tallies = this.record.get(name)[0];
			}
			this.record.set(name, [tallies, true]);

			//add speaker to items
			var qSpeaker = new Speaker(name, tallies);
			this.items.push(qSpeaker);

			//update position in items (percolate up kinda)
			var index = this.items.length-1;
			var replaced_speaker = qSpeaker;
			while(index > 0) {
				var parent = get_parent(index);
				// console.log(index);
				// console.log(parent);
				var parent_speaker = this.items[parent];
				// console.log(parent_speaker.name);
				//see if the new speaker has spoken less than the parent
				if(parent_speaker.tallies > qSpeaker.tallies) {
					index = parent;
					replaced_speaker = parent_speaker;
				} else {
					//check all speakers between new speaker and parent
					index--;
					while(index > parent && this.items[index].tallies > qSpeaker.tallies) {
						replaced_speaker = this.items[index];
						index--;
					}
					index++;
					replaced_speaker = this.items[index];
					break;
				}
			}
			this.items[index] = qSpeaker;
			this.items.splice(index+1, 0, replaced_speaker);
			this.items.pop();

			return true;
		} else { return false; }
	}

	this.pop = () => {
		// var popped_speaker = this.items[0];
		if(this.items.length == 0) {
			//check that the queue is not empty
			return false;
		}

		var name = this.items[0].name;
		this.record.set(name, [this.items[0].tallies+1, false]);
		// console.log(this.record.get(name));
		// console.log(this.record);
		return this.items.shift();
	}

	this.remove = (name) => {
		//make sure name is in items
		console.log(this.record);
		if(!this.record.get(name)[1]) {
			//alert(name + " is not in the queue");
			return false;
		}

		// //subtract tally from record
		// this.record.set(name, [this.record.get(name)[0]-1, false])

		//iterate through items
		for(var i = 0; i < this.items.length; i++) {
			if(this.items[i].name == name) {
				var removed_speaker = this.items[i];
				this.items.splice(i, 1);
				this.record.set(name, [removed_speaker.tallies, false]);
				return true;
			}
		}
	}

	//clear all items in the queue
	//returns number of removed items
	this.clear = () => {
		if(this.items.length == 0) {
			//check that the queue is not empty
			return 0;
		}

		var numRemoved = 0;
		for(var i = this.items.length-1; i >= 0; i--) {
			numRemoved++;
			var removed_speaker = this.items[i];
			this.items.pop();
			this.record.set(removed_speaker.name, [removed_speaker.tallies, false]);
		}
		return numRemoved;
	}
}

//export PriorityQueue Class
module.exports = {
	PriorityQueue: PriorityQueue //.constructor
}