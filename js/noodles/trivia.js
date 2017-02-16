// Trivia game noodle


// Create a stateMap
var testMaps = {

	amIPsychic: {
		states: {
			origin: {
				onEnterSay: "#/v#To most people, the future is dark and murky, but maybe you’re different. Maybe the future to you is an unread book, just waiting to be pulled off the shelf. Will you flip through its pages? Will you read into the future? Will you discover your psychic potential?",
				exits: ["_totalPlays>0 ->returningPlayer", "->firstTimePlayer"],
			},

			firstTimePlayer: {
				onEnterSay: "#firstTimeInstructions#\n#firstTimePrompt#",
				exits: "->predict"
			},

			returningPlayer: {
				onEnterSay: "#returningInstructions#\n#returningPrompt#",
				exits: "->predict"
			},

			predict: {
				chips: ["heads", "tails"],
				exits: ["'heads' ->doFlip prediction='heads'", "'tails' ->doFlip prediction='tails'", "'*' ->askForClarification"],
			},

			askForClarification: {
				onEnterSay: ["#askForClarification#"],
				exits: ["->predict"]
			},

			doFlip: {
				onEnter: ["'#flipping#'", "value=random()"],
				exits: ["value<.5 ->result_heads", "->result_tails"],
			},

			result_heads: {
				onEnter: "playSound(coinflip_heads.wav) result='heads' '#itsHeads#'",
				exits: ["->tally"],
			},

			result_tails: {
				onEnter: "playSound(coinflip_tails.wav) result='tails' '#itsTails#'",
				exits: ["->tally"],
			},

			result_edge: {
				onEnter: "playSound(coinflip_edge.wav) result='edge' '#itsEdge#'",
				exits: ["->tally"],
			},

			tally: {
				exits: ["prediction==result ->right ", "->wrong"],
			},

			// On ending a losing streak
			// On ending a winning streak
			// On achieving a new winning streak
			// On achieving a new losing streak

			right: {
				onEnter: "'#youWereRight#' winStreak++ lastLoseStreak=loseStreak loseStreak=0 rightGuesses++ pattern+='C' accuracy=rightGuesses/(wrongGuesses + rightGuesses)",

				onEnterDoOne: ["lastLoseStreak>2 '#lostLosingStreak#'",
					"winStreak>streak2 '#winningStreak2#'",
					"winStreak>streak1 '#winningStreak1#'",
					"winStreak>streak0 '#winningStreak0#'",
					"'#genericWin#'"
				],

				exits: ["->predict"]
			},

			wrong: {
				onEnter: "'#youWereWrong#' loseStreak++ lastWinStreak=winStreak  winStreak=0 wrongGuesses++ pattern+='X' accuracy=rightGuesses/(wrongGuesses + rightGuesses)",

				onEnterDoOne: ["lastWinStreak>2 '#lostWinningStreak#'",
					"loseStreak>streak2 '#losingStreak2#'",
					"loseStreak>streak1 '#losingStreak1#'",
					"loseStreak>streak0 '#losingStreak0#'",
					"'#genericLose#'"
				],

				exits: ["->predict"]
			},



		},

		initialBlackboard: {
			wrongGuesses: 0,
			rightGuesses: 0,
			pattern: "",
			winStreak: 0,
			loseStreak: 0,
			edgeChance: .001,
			streak0: 2,
			streak1: 4,
			streak2: 6
		},

		grammar: {

			// BAD WRITING FROM KATE
			winningStreak2: "That's amazing, you're so good!",
			winningStreak1: "You've really got a winning streak going!",
			winningStreak0: "Very promising",
			losingStreak2: "That's amazing, you're terrible at this!",
			losingStreak1: "Wow, you might be reverse psychic.",
			losingStreak0: "Not looking good for your psychic ability",
			lostLosingStreak: "What a comeback from #/lastLossStreak# losses!",
			lostWinningStreak: "Oh no, you lost your #/lastWinStreak#",



			debugData: "(debug info: loseStreak:#/loseStreak# winStreak:#/winStreak# chain:#/pattern# accuracy:#/accuracy#)",

			itsHeads: ["Heads!"],
			itsTails: ["Tails!"],
			itsEdge: ["It’s in the air! It’s arcing magnificently, it’s falling, it’s coming down, it’s head—no, tail—no, it isn’t either. The coin landed on its edge. The odds are astronomically against this, [memory_name]. Congratulations, you’ve earned the Against All Odds achievement."],

			flipping: "I'm flipping the coin...",

			returningInstructions: ["I’ll flip a coin, and you try to predict the results.", "You know the drill: I'll flip a coin. You predict what it'll be.", "Welcome back! All our testing equipment is still set up. Just make a prediction, and I'll flip a coin."],
			firstTimeInstructions: ["I’m going to flip a coin. You tell me what you think it’ll land on. We’ll keep a running tally and see how many you get right."],
			returningPrompt: ["Here we go again: heads or tails?",
				"Call it: heads or tails?",
				"What do you think, heads or tails?",
				"Let’s do it again: heads or tails?",
				"Take another shot: heads or tails?",
				"Let’s keep going and see where we end up! Heads or tails?",
				"How are you feeling today, heady or tail-ish?",
				"Let’s try again! Heads or tails?",
				"Look into the future and call it, heads or tails?",
				"What’s the next flip, heads or tails?",
				"Let’s keep going! Heads or tails?"
			],
			firstTimePrompt: ["Here we go—heads or tails?",
				"Get ready—heads or tails?",
				"Clear your mind and focus: heads or tails?"
			],

			c: ["It’s #/result#! {Correct SFX} It’s too early to say for sure, but your psychic abilities are showing quite a bit of potential. Let’s try again.", "You got it right!", "Go team! That means you."],
			x: ["Oh, it was #/result#. {Incorrect SFX} Even world-class psychics take some time to get warmed up. Let’s keep going. Take a deep breath, let your mental energy flow, and try again."],

			askForClarification: [],
		}
	},


	bobRoss: {

	},


	maraudersMap: {
		states: {
			origin: {
				onEnterSay: "#update#",
				chips: ["look at the Marauder's Map"],
				exits: ["'*' ->origin"]
			}
		},

		grammar: {
			student: ["Cedric Diggory", "Zacharias Smith", "Justin Finch-Fletchley", "Hannah Abbott", "Susan Bones", "Erni Macmillan", "Luna Lovegood", "Cho Chang", "Padma Patil", "Marietta Edgecobe", "Felicity Eastchurch", "Vincent Crabbe", "Draco Malfoy", "Millicent Bulstrode", "Pansy Parkinson", "Blaise Zabini", "Gregory Goyle", "Percy Weasley", "Oliver Wood", "Fred Weasley", "George Weasley", "Lee Jordan", "Dean Thomas", "Harry Potter", "Ron Weasley", "Hermione Granger", "Lavender Brown", "Neville Longottom", "Parvati Patil", "Colin Creevey", "Ginny Weasley"],
			professor: ["Professor Sprout", "Dolores Umbridge", "Professor Quirrell", "Gilderoy Lockhart", "Professor Slughorn", "Rubeus Hagrid", "Sybil Trelawney", "Severus Snape", "Remus Lupin", "Professor Flitwick", "Professor Dumbledore", "Professor McGonagall"],
			outsideLocation: ["the shore of the Great Lake", "the Forbidden Forest", "the Whomping Willow"],
			insideLocation: ["#academicLocation#", "#privateLocation#"],
			academicLocation: ["#professor#'s office", "the #subject# classroom"],
			privateLocation: ["the Hufflepuff basement", "the Ravenclaw Tower", "the Slytherin Dungeon", "the Gryffindor Tower", "#house# common room", "#house# #upper# dormitory"],
			house: ["Hufflepuff", "Ravenclaw", "Slytherin", "Gryffindor"],
			location: ["#insideLocation#", "#insideLocation#", "#outsideLocation#"],
			upper: ["upper", "lower"],
			stairs: ["trapdoor", "stairs", "ladder"],
			transitLocation: ["the hallway outside #insideLocation#", "the #stairs# to #insideLocation#"],
			subject: ["Astronomy", "Herbology", "Alchemy", "Apparition", "Arithmancy", "Study of Ancient Runes", "Potions", "Transfiguration", "Divination", "Charms", "History of Magic", "Muggle Studies", "Defense Against the Dark Arts"],

			creature: ["grindylow", "dragon", "hippogriff", "acromantula", "basilisk", "phoenix"],
			sentient: ["house elf", "merperson", "centaur", "ghoul", "giant", "dementor"],
			cause: ["House Elf Liberation", "Ghost Extermination", "#sentient# Rights", "#creature# Conservation", "anti-subject"],

			spellType: ["curse", "hex", "charm", "spell", "enchantment"],
			spellAdj: ["forbidden", "obsolete", "magical", "implausible", "lost"],
			bookType: ["#spellAdj# #spellType.s#", "#spellType.s#"],
			against: ["for", "for", "against"],
			army: ["Detractors", "Army", "Coven", "Force", "Society"],
			organization: ["the Society #against# #cause#", "the #cause# Army", "#professor#'s #army#"],
			ghost: ["the Fat Friar", "Nearly Headless Nick", "The Bloody Baron", "Peeves", "Professor Cuthbert Binns", "Moaning Myrtle", "The Grey Lady"],
			person: ["#professor#", "#professor#", "#student#", "#student#", "#student#", "#student#", "#sentient.a#"],
			urgently: ["politely", "angrily", "urgently", "quietly", "loudly"],
			communicatingWith: ["debating #subject# with #person#", "scolding #person#"],
			doingRegularThing: ["reading #book# in #location#", "napping in #location#", "talking #urgently# to #person#", "#communicatingWith# #person#"],
			doingMagic: ["practing duelling", "practicing forbidden curses"],
			update: ["#person# is chasing an escaped #creature# through #transitLocation#", "#person# is sneaking into #insideLocation# with #person#", "#person# is #doingRegularThing#", "#ghost# is drifting through #transitLocation#", "#ghost# is currently haunting #insideLocation#", "#student# is #doingMagic# in the Room of Requirement", "#student#, #student# and #student# are #doingMagic# in the Room of Requirement", "#student#, #student# and #student# are holding a secret meeting of \"#organization#\" in the Room of Requirement", "#student# is sneaking into #location# with #student#", "#professor# and #professor# are debating #spellStuff# in #academicLocation#", "#person# is researching #magicArtifact# in the library's #bookType# wing"]
		},


		initialBlackboard: {
			locations: {

			},
			students: {
				Hufflepuff: ["Cedric Diggory", "Zacharias Smith", "Justin Finch-Fletchley", "Hannah Abbott", "Susan Bones", "Ernie Macmillan"],
				Ravenclaw: ["Luna Lovegood", "Cho Chang", "Padma Patil", "Marietta Edgecobe", "Felicity Eastchurch"],
				Slytherin: ["Vincent Crabbe", "Draco Malfoy", "Millicent Bulstrode", "Pansy Parkinson", "Blaise Zabini", "Gregory Goyle"],
				Griffindor: ["Percy Weasley", "Oliver Wood", "Fred Weasley", "George Weasley", "Lee Jordan", "Dean Thomas", "Harry Potter", "Ron Weasley", "Hermione Granger", "Lavender Brown", "Neville Longottom", "Parvati Patil", "Colin Creevey", "Ginny Weasley"]


			},
			professors: ["Professor Sprout", "Dolores Umbridge", "Professor Quirrell", "Gilderoy Lockhart", "Professor Slughorn", "Rubeus Hagrid", "Sybil Trelawney", "Severus Snape", "Remus Lupin", "Professor Flitwick", "Professor Dumbledore", "Professor McGonagall"],

			ghosts: ["the Fat Friar", "Nearly Headless Nick", "The Bloody Baron", "Peeves", "Professor Cuthbert Binns", "Moaning Myrtle", "The Grey Lady"]
		}
	},


	quiz_m0: {
		states: {
			origin: {
				onEnterSay: "Welcome to the hip hop name quiz (Matthue edition, v.0)",
				exits: ["->shuffleDeck"],
				//exits: ["->cheat"],
			},

			// Pick out 4 questions to answer, and shuffle the order
			shuffleDeck: {

				onEnter: ["order=shuffle(order)", "index=-1"],
				exits: ["->next_question"]
			},

			next_question: {
				onEnter: ["index++", "type=order[index]"],


				exits: [
					// go to end
					"index>=order.length ->end",
					// Next question
					"index<order.length ->question"
				]
			},
			question: {
				// Pick out a question for this type
				onEnter: ["qIndex=randomIndex(questions[type])", "q=questions[type][qIndex]"],
				onEnterSay: "#/q/q#",
				chips: ["#/q/a/0#", "#/q/a/1#"],
				exits: ["inputMatches(q.a[0]) ->next_question values[type]=select(q.v[0])",
					"inputMatches(q.a[1]) ->next_question values[type]=select(q.v[1])"
				],

			},

			end: {
				onEnterSay: "Your name is #/values/title# #/values/adj# #/values/noun# #/values/suffix#",
				exits: ["wait:40 ->origin"]
			}


		},

		initialBlackboard: {
			order: ["adj", "title", "noun", "suffix"],
			questions: {
				title: [{
					q: "Do you dance a little or a lot?",
					a: ["a little", "a lot"],
					v: ["Lil", "Big"],
				}, {
					q: "Do you like to heal people or just make them feel good?",
					a: ["heal them", "feel good"],
					v: ["Dr.", "McLovin'"],
				}, {
					q: "Are you a morning person or a night person?",
					a: ["morning", "night"],
					v: ["AM", "Sleepy"],
				}, {
					q: "Do you like orange juice or dragonfruit juice?",
					a: ["orange juice", "dragonfruit juice"],
					v: ["OJ", "DJ"],
				}],

				adj: [{
					q: "Do you want to build a snowman?",
					a: ["yes", "no"],
					v: ["Chilly", "Roasty"]
				}, {
					q: "Do you leave your bed made or unmade?",
					a: ["made", "unmade"],
					v: ["Rocky", "Smooth"]
				}, {
					q: "Do you like to exercise?",
					a: ["yes", "no"],
					v: [
						["Stretchy", "Bouncin'"],
						["Ill", "Sick"]
					]
				}],
				noun: [{
					q: "Do you hide in shadows or leap out in a brilliant burst?",
					a: ["shadows", "burst"],
					v: ["Ninja", "Sunspot"]
				}, {
					q: "When you listen to music, do you like to blast it or keep it on the DL?",
					a: ["Extra small", "Extra large"],
					v: ["Smallie", "Big Ol'"]
				}, {
					q: "What’s your dance: twerking or the robot?",
					a: ["twerking", "robot"],
					v: ["Bear", "Cyborg"]
				}, {
					q: "Do you have anything in your pockets?",
					a: ["lots of stuff", "nothing"],
					v: ["Super Size", "Pocket Protector"]
				}, {
					q: "Licorice or Pixy Stix?",
					a: ["Licorice", "Pixy Stix"],
					v: ["Twist", "Straight Up"]
				}],

				suffix: [{
					q: "Which album do you like better: Kind of Blue or Master of Puppets?",
					a: ["Kind of Blue", "Master of Puppets"],
					v: ["Jazzy", "Rock"]
				}, {
					q: "Do you like to get up or get down?",
					a: ["get up", "get down"],
					v: ["Butterfly", "Caterpillar"]
				}, {
					q: "Are you the party planner or the party starter?",
					a: ["party planner", "party starter"],
					v: ["The Parader", "The Invader"]
				}, {
					q: "Pick one: a burger or a salad.",
					a: ["a burger", "a salad"],
					v: ["McAwesome", "Crispy"]
				}, {
					q: "Are you a warm weather person or a cold weather person?",
					a: ["warm", "cold"],
					v: ["Hot stuff", "Cooly cool cool"]
				}]
			}

		}
	},

	quiz: {
		states: {
			origin: {
				onEnterSay: "Welcome to the hip hop name quiz\nI'll ask you some questions to determine your optimal hiphop DJ name\nAnswer each question with 'one' or 'two', or 'reset' to start over",
				onEnter: "count=0 scores.Kawaii=0 scores.Nature=0 scores.Tough=0 scores.Nerd=0 scores.Money=0",
				exits: ["->q_start"],
				//exits: ["->cheat"],
			},

			cheat: {
				onEnter: "count=4 scores[select(themes)]++ scores[select(themes)]++ scores[select(themes)]++ scores[select(themes)]++ scores[select(themes)]++",
				exits: "->calculateScore"
			},

			q_start: {
				exits: ["count<5 ->q_ask", "count>=5 ->calculateScore"],
			},

			// Compare two things
			q_ask: {
				onEnter: "count++ q0=select(themes) q1=select(themes)",
				onEnterSay: ["#question#"],
				exits: ["'one' ->q_start scores[q0]++", "'two' ->q_start scores[q1]++"]
			},

			// Find the two highest scores
			calculateScore: {
				onEnterFxn: function(pointer) {
					var sorted = ["Tough", "Nature", "Nerd", "Kawaii", "Money"].sort(function(a, b) {
						var scoreA = pointer.get("scores." + a);
						var scoreB = pointer.get("scores." + b);

						return scoreB - scoreA;
					});

					if (pointer.get(sorted[1]) === 0) {
						pointer.set("theme1", sorted[0]);
					} else {
						pointer.set("theme1", sorted[1]);
					}

					pointer.set("theme0", sorted[0]);
				},
				exits: "->assignName"
			},

			assignName: {
				onEnter: ["'Your traits are #/theme0# and #/theme1#\n So your hiphop name is #rapperName#\nor #rapperName#\nor #rapperName#\nor #rapperName#'"],

				exits: ["wait:60 ->origin"],
			},

			random: {

				onEnter: "theme0=select(themes) theme1=select(themes)",
				exits: "->assignName"
			},

			universal: {
				exits: "'reset' ->origin"
			}
		},

		initialBlackboard: {
			themes: ["Tough", "Nature", "Nerd", "Kawaii", "Money"],
		},
		grammar: {
			question: ["#rather#", "#rather#", "#rather#", "#pet#"],
			pet: ["Would you rather have #pet{/q0}.a# or #pet{/q0}.a#?"],
			rather: ["Would you rather #activity{/q0}#, or #activity{/q1}#?"],


			petNerd: ["robot servant", "clone of yourself", "killbot", "space station", "lightsaber"],
			petNature: ["pet squirrel", "tree you could talk to", "whale as a friend", "treehouse"],
			petKawaii: ["actual unicorn", "pet hamster", "pony", "gallon of glitter", "miniature poodle", "literal ton of candy"],
			petTough: ["bodyguard", "pet grizzly bear", "secret island fortress", "private gym", "collection of samurai swords"],
			petMoney: ["private island", "private airplane", "secret art museum", "mansion", "castle", "toilet made of solid gold"],



			activityNerd: ["write code", "win the Nobel prize in physics", "start a software company", "be famous in Silicon Valley", "have a shiny new computer"],
			activityNature: ["go for a hike", "see a tiger in the wild", "go horseback riding", "scuba dive on a coral reef", "go surfing", "be able to fly", "be able to talk to animals"],
			activityKawaii: ["be covered in kittens", "pet a puppy", "own a candy store", "have an ice cream flavor named after you", "be reincarnated as a hamster", "be a dolphin"],
			activityMoney: ["win the lottery", "own a mansion", "win a new car", "take your friends out to dinner", "own an amusement park"],
			activityTough: ["be able to punch through a brick wall", "be the strongest person in the world", "have a personal army", "know kung fu", "own a suit of armor", "fly a fighter jet", "be able to do a backflip", "get a blackbelt in karate"],

			baseRapperName: ["#adj{/theme0}.capitalize##noun{/theme1}.capitalize#", "#adj{/theme1}.capitalize##noun{/theme0}.capitalize#", "#adj{/theme0}.capitalize# #noun{/theme1}.capitalize#", "#adj{/theme1}.capitalize# #noun{/theme0}.capitalize#",
				"#adj{/theme0}.capitalize#-#noun{/theme1}.capitalize#", "#adj{/theme1}.capitalize#-#noun{/theme0}.capitalize#"
			],
			rapperModified: ["#baseRapperName.capitalize.hiphopify#", "#baseRapperName.capitalize#"],
			prefix: ["Doctor", "DJ", "MC", "DJ", "MC", "Grandmaster", "The"],
			rapperName: ["#rapperModified.capitalize#", "#prefix# #rapperModified.capitalize#", "#prefix# #rapperModified.capitalize#", "#baseRapperName.hiphopify#"],

			adj: ["baby", "young", "big", "cool"],
			noun: ["boy", "sugar", "man", 'kid', "million", "note", "tone"],

			adjTough: ["sword", "stab", "dead", "bullet", "furious", "angry", "rage", "skull", "death", "murder", "brutal", "iron", "steel", "kill", "hard", "shiv", "blood", "fight", "riot", "scar", "knight"],
			nounTough: ["murder", "kill", "stab", "brute", "bone", "wrecker", "hand", "fist", "kick", "ninja", "zombie", "fighter"],

			adjNature: ["tiger", "free", "tofu", "bird", "nature", "fly", "clean", "mammoth", "outside", "fresh", "surf", "storm"],
			nounNature: ["mountain", "tree", "wind", "owl", "cat", "sun", "heart", "planet"],

			adjNerd: ["book", "sci", "space", "star", "science", "word", "math", "atomic", "data", "digital", "mega", "nano", "cyber"],
			nounNerd: ["laser", "nova", "book", "nerd", "future", "head", "brain", "neuron", "feed", "tech", "byte"],

			adjKawaii: ["adora", "cuddle", "kitten", "baby", "mini", "candy", "glow", "hamster", "bubble", "glitter", "sunny", "rainbow", "emoji"],
			nounKawaii: ["kitten", "puppy", "pants", "kitty", "muffin", "waffle", "heartz", "idol", "mint", "panda", "gloss", "shine"],

			adjMoney: ["sugar", "richie", "dolla", "royal", "$", "king", "queenie", "cash", "ice", "bling", "grand", "mega"],
			nounMoney: ["cash", "coinz", "billz", "million", "note", "money", "baron", "millionaire"]
		}
	},

	rhymes: {
		states: {
			origin: {
				exits: ["->initRhyme"],
			},
			activity: {
				nature: ["go for a hike", "watch fish in a pond", "climb a mountain"],
				money: [""],
				nerd: [],
				kawaii: [],
			},

			initRhyme: {
				onEnter: "rhyme=select(rhymes) firstLine=select(lines[rhyme]) '#/firstLine#'",
				exits: ["->rhyme"]
			},

			rhyme: {
				onEnter: "firstLine=select(lines[rhyme]) '#/firstLine#' 'Is this a good next line?'",
				exits: ["wait:40 ->rhyme", "'yes' ->rhyme", "'no' ->rhyme", "'new rhyme' ->initRhyme"]


			}
		},
		grammar: {
			noun: ["cat", "moose", "cloud", "car", "friend", "rose", "mouse", "cake", "book", "snake"],
			adj: ["tall", "great", "cool", "smart", "nice", "giant"],
		},
		initialBlackboard: {
			rhymes: ["ee", "ad", "ays"],
			lines: {
				ays: ["How do I love #noun#s? Let me count the ways", "I'll love #noun#s for all my days"],
				ad: ["I remember a #noun# I had", "A #adj# #noun# would be rad", "#noun#s will never make me sad", "A #noun# can always make me glad"],
				ee: ["A #noun# is lovely as a tree", "I'm not as #adj# as #noun.a# would be"],

			},

		},
	},

	test3: {
		states: {
			origin: {
				onEnter: "playerName='#name#' restartCount++ coins=10 '#greetings# #/playerName#'",
				exits: ["->start", "wait:2 'start'->start", "wait:15 ->start"],
			},

			start: {
				onEnter: "'#/playerName# starts'",
				exits: ["->round"],
			},

			round: {
				onEnter: "'You have #/coins# coins. Gamble, or hold?'",
				exits: ["'NUMBER' ->gamble bet=INPUT_NUMBER", "'#gamble#' ->howMuch next='gamble' value='toSet'"],
			},

			howMuch: {
				onEnter: "'How much?'",
				exits: ["'#number#' ->(next) (toSet)=INPUT_NUMBER"]
			},

			gamble: {
				onEnter: "'I\\'m rolling dice right now...'",
				exits: ["(random()>.4) ->gamble_lose", "(random()>.4) ->gamble_win"]
			},

			gamble_lose: {
				onEnter: "coins-=bet '#/playerName# loses #/bet#.'",
				exits: ["priority:0 ->round", "coins<=0 ->lose"]
			},

			gamble_win: {
				onEnter: "coins+=bet '#/playerName# wins #/bet#.'",
				exits: ["priority:0 ->round"]
			},
			lose: {
				onEnter: "'You have no coins left, you lose'",
				exits: ["wait:5 ->origin"]
			},

		},
		grammar: {
			greetings: ["greetings", "hi", "hello", "welcome back"],
			name: ["#adj# #animal#"],
			adj: ["sleepy", "grumpy", "shy"],
			animal: ["unicorn", "dragon", "corgi", "kitten"]
		},
		exits: ["'reset'->origin", "priority:0 '*' ->/ 'Sorry, I didn\\'t understand that'"],
		initialBlackboard: {
			x: 1.2235,
			y: 2,
			restartCount: 0,
			eggs: [{
				size: "large",
				isStriped: true,
				description: "green"
			}, {
				size: "small",
				isStriped: true,
				description: "red"
			}, {
				size: "tiny",
				description: "pink"
			}],
			name: null,
			hunger: 0,
			affection: 0,
			interactions: 0,
			words: [],
			tricks: [],

		},
	},
	petSim: {
		grammar: {
			furTextureBase: ["fluffy", "curling", "smooth", "silky", "shiny", "iridescent", "long"],
			fur: ["fur", "feathers", "scales"],
			furTexture: ["#furTextureBase#"],
			furAmt: ["a mane of ", "patches of ", ""],
			color: ["red", "blue", "grey", "pink", "silver", "gold", "purple", "indigo", "green"],
			mod: ["electro", "were", "cyber", "fire", "wind", "aero", "flame", "sun", "spiral", "war", "mist", "space", "necro", "cyber", "slime", "mud", "air", "anti", "grav", "magna", "phantasma"],
			species: ["bear", "penguin", "spider", "dolphin", "squid", "otter", "puppy", "kitten", "dragon", "tiger", "lizard", "iguana", "snake", "peacock", "hamster", "sloth", "koala", "pony", "chinchilla", "chicken", "bunny"],
			trait: ["antlers", "#color# stripes", "#color.a# belly", "#color.a# ears", "#color# toes", "#short.a# tail", "#short# #color# #fur#"],
			short: ["luxurious", "long", "short", "fluffy", "soft", "silky"],
			tailAdjBase: ["stumpy", "wide", "long", "feathery", "scaly", "glowing"],
			tailAdj: ["#tailAdjBase#", "#tailAdjBase# #color#"],
			horns: ["antlers", "horns", "ears"],
			attribute: ["#furAmt##furTexture# #fur#", "#tailAdj.a# tail", "#tailAdj# wings", "a single #tailAdj# horn", "#tailAdj# tentacles", "#tailAdj# #horns#"],
			size: ["large", "small", "medium", "tiny", "enormous"],
			describeEggIndex: ["#eggs/{#/eggIndex#}/size# #eggs/{#/eggIndex#}/color#"],

			describeCreatureIndex: ["#creatures/{#/cIndex#}/species0#-#creatures/{#/cIndex#}/species1#"],
			describeCreatureIndexFull: ["#creatures/{#/cIndex#}/color# #creatures/{#/cIndex#}/species0#-#creatures/{#/cIndex#}/species1#, with #creatures/{#/cIndex#}/attribute#"],
			describeEgg: ["#/size# #/color# egg worth #/cost#"],
		},
		states: {

			origin: {
				onEnter: "'Loading MonsterPets'",
				exits: "->gainEgg"
					//	exits: "->hatch_egg"

			},

			gainEgg: {
				// Push to an array
				onEnter: "create('egg',3,5)",
				exits: "->inventory"
			},

			idle: {

			},

			inventory: {

				// there are N eggs in the inventory
				onEnter: ["'you have #/eggs/length# eggs'", "'#describeEgg#' for egg in eggs"],

				exits: ["wait:100 ->gainEgg", "'sell' ->sell_whichEgg", "'hatch' eggs.length>0 ->hatch_whichEgg", "'hatch' eggs.length==0 ->@ 'You don\\'t have any eggs to hatch'"],
			},

			sell_whichEgg: {
				onEnter: ["'Ok, which egg do you want to sell?'"],
				exits: ["'one' ->sell_egg eggIndex=0",
					"'two' ->sell_egg eggIndex=1",
					"'three' ->sell_egg eggIndex=2f"
				],
			},



			sell_egg: {
				onEnter: ["'You sell the #describeEggIndex# egg.'", "coins+=eggs[eggIndex].cost", "deleteAt(eggs, eggIndex)"],
				exits: ["->inventory"]
			},



			hatch_whichEgg: {
				onEnter: ["'Ok, which egg do you want to hatch?'"],
				exits: ["'one' ->hatch_egg eggIndex=0",
					"'two' ->hatch_egg eggIndex=1",
					"'three' ->hatch_egg eggIndex=2"
				],
			},
			hatch_egg: {
				onEnter: ["create('creature',3,5)", "cIndex=creatures.length-1", "'The #describeEggIndex# egg hatches.\n It's a #describeCreatureIndexFull#'", "deleteAt(eggs, eggIndex)"],
				exits: ["->inventory"]
			},

			feed: {
				onEnter: ["'You want to feed your #describeCreatureIndex#.  It looks hungry. What do you gve it to eat?'"],
				exits: ["'*' hash(INPUT)>50 ->feed_bad food='#/INPUT#'", "'*' hash(INPUT)<50 ->feed_good food='#/INPUT#'"]
			},

			feed_bad: {
				onEnter: ["'It sniffs the #/food#, and turns away in disgust. I guess it doesn\\'t like that food!'"],
				exits: "->loseMood"
			},

			feed_good: {
				onEnter: ["'It eats #/food#, chewing happily. I guess it likes that food!'"],
				exits: "->gainMood"
			},

			gainMood: {
				onEnter: ["'#describeCreatureIndex# gets happier'", "(mood+=10)"],
				exits: ["->checkMood"]
			},


			loseMood: {
				onEnter: ["'#describeCreatureIndex# gets less happy'", "(mood-=10)"],
				exits: ["->checkMood"]
			},

			checkMood: {
				exits: ["(mood>60) ->idle 'The #describeCreatureIndex# is very happy!'",
					"(mood<30) ->idle 'The #describeCreatureIndex# is very sad, and doesn\\'t like you!'",
					"(mood>=30&&mood<=60) ->idle 'The #describeCreatureIndex# isn\\'t sure if it likes you yet'"
				],
			},

			lookAt: {
				onEnter: ["'It\\'s a #describeCreatureIndex#. Its happiness is #/mood# out of 100. It is #/creatures/{cIndex}/age# days old'"],
				exits: "->idle"
			}

		},



		exits: [
			//"'name' ->reactToName play(media#name#) interactions++ ++affection bonding+=affection *",
			// /"wait:10 input:* ->idle (eggCount+=1) (foo--) (foo.bar--) foo(#/bar/baz#) foo(bar.baz) foo-=1 {#/bar/foo(10+foo)#}=-foo*-1 (if (eggCount>10) eggCount = 10) "
			//	"eggs[eggs.count - 1] ->idle eggs[0]=1 push(eggs, 5) myEgg=pop(eggs)",
			"wait:90 ->inventory",
			"'cheat' ->idle 'Time passes...' creatures[cIndex].age+=10",
			"'feed' ->feed",
			"'buy' ->gainEgg",
			"'inventory' ->inventory",
			"'look' ->lookAt"
		],

		initialBlackboard: {
			eggs: [],
			creatures: [],
			coins: 0,
			eggIndex: 0,
			mood: 50

		},
		contentRecipes: {
			egg: "size:'#size#' color:'#color#' cost:(randomInt(5,20) * 10)",
			creature: "species0:'#species#' species1:'#species#'  age:1 attribute:'#attribute#' color:'#color#'"
		},


	},

	trivia: {
		name: "trivia",
		states: {

			origin: {
				onEnter: "Welcome to Lucky Trivia",
				exits: {
					start: "->startRound shuffleQuestions() questionIndex=0 playerIndex=0 roundIndex=0 playerIndex=0"
				},
			},


			setNicknamesStart: {
				exits: "->setNicknameAsk playerIndex=0"
			},

			setNicknameAsk: {
				onEnter: "Player #/playerIndex#, what's your name?",
				exits: {
					any: "* ->setNicknameGive (I guess that's a real name)",
					silence: "wait:5 ->setNicknameGive (The quiet type, huh?)"
				}
			},

			setNicknameGive: {
				onEnter: "I'll call you #/players/playerIndex/{#playerIndex#}#",
				exits: {
					next: "playerIndex<playerCount ->setNicknameAsk + playerIndex",
					done: "playerIndex=playerCount ->POP"
				}
			},

			startRound: {
				exits: "->q_setQuestion PUSH playerIndex+=1 questionIndex+=1"
			},


			q_setQuestion: {
				exits: "->q_setPlayer"
			},
			q_setPlayer: {
				onEnter: "Player #/playerCount#, are you ready for a question about #/question/topic",
				exits: {
					ask: "yes ->q_ask",
					wait: "wait:5 ->q_ask"
				}
			},
			q_ask: {
				onEnter: "#/question/q#",
				exits: {
					correct: "question.a[0] ->q_correct",
					wrong0: "question.a[1] ->q_incorrect",
					wrong1: "question.a[2] ->q_incorrect",
					wrong2: "question.a[3] ->q_incorrect",
					unknown: "* ->q_notUnderstood"
				},
			},

			q_incorrect: {
				onEnter: "Sorry, the answer is #/question/a[0]#",
				exits: "->POP"
			},
			q_correct: {
				onEnter: "That's right, the answer is #/question/a[0]#",
				exits: "->POP"
			},
			q_notUnderstood: {
				onEnter: "Sorry, I didn't understand that.",

				exits: "->q_ask"
			}
		},

		fxns: {

			shuffleQuestions: function() {
				var obj = this.map.stateSpace;
				console.log("shuffle");
				obj.questions = obj.questionList.slice(0);
				console.log(obj.questions);
			}
		},

		stateSpace: {
			questionList: [{
				cat: "geography",
				q: "What is the capital of Djibouti?",
				a: ["Djibouti", "Abbe", "Aden", "River City"],
			}, {
				cat: "geography",
				q: "What is the only city in the world located on two continents?",
				a: ["Istanbul", "Cairo", "London", "Reyjavik"],
			}, {
				cat: "pop culture",
				q: "How many spells are mentioned in the Harry Potter books?",
				a: ["75", "240", "12", "47"],
			}, {
				cat: "pop culture",
				q: "What is Beyonce's middle name?",
				a: ["Giselle", "Adele", "Carter", "Fierce"]
			}, {
				cat: "science",
				q: "What is the farthest planet from the Sun?",
				a: ["Neptune", "Uranus", "Cleo", "Pluto"]
			}, {
				cat: "animals",
				q: "Cygnophobia is fear of what animal?",
				a: ["swans", "spiders", "snakes", "seals"]
			}, {
				cat: "animals",
				q: "Brigadier Sir Nils Olav was given a knighthood by Norway in 2008.  What species is he?",
				a: ["penguin", "polar bear", "horse", "reindeer"]
			}, {
				cat: "science",
				q: "Of the four fundamental physical forces, which is the only one that can both push, and pull?",
				a: ["Electromagnetic", "Gravity", "Strong Nuclear", "Love"]
			}],
		}
	},



	besties: {
		states: {
			origin: {
				onEnterSay: "Let's play Besties.\nGot your bestie ready?",
				exits: {
					assent: "(yes) ->start",
					timeout: "wait:1 ->start",
				}
			},

			start: {
				onEnterSay: "This super-scientific quiz will test your knowledge of each other.",

				exits: {
					start: "->q_start questionIndex=0 playerIndex=0 roundCount=6",
				}
			},

			endgame: {
				onEnter: [
					"score>roundCount*.6 	-> 'Superbuds!' 		sticker(friend0) playSound(win)",
					"score>roundCount*.4 	-> 'Adequate buds!' 	sticker(friend0) playSound(friend)",
					"score>roundCount*.2 	-> 'Barely buds!' 		sticker(friend0) playSound(neutral)",
					"(50*5)*(11-3)>0 		-> 'Mortal enemy buds!' sticker(friend0) playSound(enemy)"
				],
				exits: {
					start: "->origin",
				}
			},

			// For each round, 
			q_question: {
				onEnterSay: "#question#",

				//onEnter: "question=allQuestions[questionIndex] player=players[playerIndex%2]",

				exits: {
					endgame: "roundIndex==roundCount ->endgame",
					q_start: "input:* ->q_evaluation"
				},

				onExitDo: "roundIndex+=1 playerIndex+=1 questionIndex+=1"
			},

			q_start: {
				onEnterSay: "#/player/name#, this is for you",
				exits: {
					start: "->q_question",
				}
			},

			q_evaluation: {
				onEnterSay: "#/player/name#, is that right?",
				exits: {
					start: "input:* ->q_start",
				}
			},



		},

		fxns: {

			shuffleQuestions: function() {
				var obj = this.map.stateSpace;
				obj.questions = obj.questionList.slice(0);
			}
		},
		grammar: {
			thing: ["bread", "car", "musical instrument", "animal", "food", "music"],
			question: ["#allQuestions#", "#allQuestions#", "#allQuestions#", "If your friend were a type of #thing#, what kind would they be?"],
			allQuestions: ["If you and #person# were a Disney princess and her sidekick, which ones would you be?", "You both walk into an art museum. Strangely, all the security guards are missing, and the art is unguarded. You impulsively grab a small painting, and start walking out. Does #person# stop you?", "If #person# were a piece of household furniture, what would they be?", "You win a charity auction. The prize? The right to legally change #person#'s name to whatever they want.  What do you name them?", "If #person# could change their middle name, what would they change it to, or would they keep it the same?", "You bake a cake for #person# to celebrate making it through 2016.  What does the cake say?", "Describe #person# as a novelty donut. Frosted? Filled? Sprinkled? What kind of donut are they?", "#person# has one chance to stop the alien invasion, and an object in this room.  What do they use, and how do they save earth?", "You inherits a vast and sprawling mansion. Its probably haunted. Will #person# stay with you on the first night, or are you on your own?", "#person# is sentenced to live forever in a single building, but they can choose which building. Where is their prison going to be?", "#person# goes to work at the zoo, but gets the worst possible job there. What are they doing?", "#person# wins the lottery and buys you a car. What kind of car do they buy you?", "If #person# were a type of bread, what type would they be?", "#person# is a lone meerkat standing watch on the Kalahari plateau.  A shadow falls across the sky, it's a tawny eagle. They can either dive for safety, or chirp to alert the colony of danger.  Will Meercat #person# save themselves, or their colony?"]
		},

		stateSpace: {
			allQuestions: ["If you and #person# were a Disney princess and her sidekick, which ones would you be?", "You both walk into an art museum. Strangely, all the security guards are missing, and the art is unguarded. You impulsively grab a small painting, and start walking out. Does #person# stop you?", "If #person# were a piece of household furniture, what would they be?", "You win a charity auction. The prize? The right to legally change #person#'s name to whatever they want.  What do you name them?", "If #person# could change their middle name, what would they change it to, or would they keep it the same?", "You bake a cake for #person# to celebrate making it through 2016.  What does the cake say?", "Describe #person# as a novelty donut. Frosted? Filled? Sprinkled? What kind of donut are they?", "#person# has one chance to stop the alien invasion, and an object in this room.  What do they use, and how do they save earth?", "You inherits a vast and sprawling mansion. Its probably haunted. Will #person# stay with you on the first night, or are you on your own?", "#person# is sentenced to live forever in a single building, but they can choose which building. Where is their prison going to be?", "#person# goes to work at the zoo, but gets the worst possible job there. What are they doing?", "#person# wins the lottery and buys you a car. What kind of car do they buy you?", "If #person# were a type of bread, what type would they be?", "#person# is a lone meerkat standing watch on the Kalahari plateau.  A shadow falls across the sky, it's a tawny eagle. They can either dive for safety, or chirp to alert the colony of danger.  Will Meercat #person# save themselves, or their colony?"]
		}
	},


	tesla: {
		states: {
			origin: {
				onEnterSay: "I am a lost tesla\ntrying to get home",
				exits: {

					timeout: "wait:1 ->driving",
				}
			},

			update: {
				onEnterSay: "#origin#",
				exits: {
					timeout: "wait:3 ->driving",
					timeout2: "wait:3 ->setRadio",
					//	ask: "input:(where are you) ->update"
				}
			},


			setRadio: {
				onEnterSay: "#activateRadio#\n",
				exits: {

					timeout: "wait:2 ->radioStation",
				}
			},

			radioStation: {
				onEnterSay: "#radioDesc#",
				exits: {

					timeout: "wait:2 ->driving",
				}
			},

			driving: {
				onEnterPlay: "cc/Syme 0#lowdigit#.wav",

				onEnterSay: "driving\n",
				exits: {

					timeout: "wait:4 ->update",
				}
			},
		},
		grammar: {
			"personActivity": ["walking alone", "on the sidewalk", "playing with a #color# ball", "riding a #color# bicycle", "on a bench", "eating candy", "sitting on the sidewalk", "waiting for a friend", "at a bus stop", "with a balloon", "laughing", "singing", "crying", "looking lost", "sitting", "walking", "holding a stuffed toy", "wearing a #color# jacket", "painting graffiti", "painting a mural", "carrying a heavy box", "drawing on the sidewalk", "pulling a wagon", "looking at #natFeature.a#", "looking at #animal.a#"],
			"personBase": ["policeman", "old man", "child", "homeless person", "girl", "little child", "teenager", "old woman", "businessman", "school child"],
			"person": ["#personBase# #personActivity#", "#personBase#"],
			"personOrPet": ["#personBase#", "#personBase#", "#personBase#", "large dog", "small dog"],
			"toggle": ["setFlag", "toggleFlag", "setMode"],
			"feels": ["LONELY", "FEELING_PRESENT", "REMEMBERING", "DREAMING", "SAD", "AT_PEACE", "WANDERING", "OBSERVING", "HOPEFUL", "SCARED"],
			"animal": ["raccoon", "sparrow", "dog", "cat", "squirrel", "pigeon", "deer", "snake", "rabbit"],
			"herdAnimal": ["chicken", "duck", "cow", "horse", "sheep", "goat"],
			"color": ["blue", "green", "red", "black", "white", "gold", "orange"],
			"metalObj": ["sign", "car", "mailbox", "trashcan", "bicycle", "fence"],

			"metalAdj": ["abandoned", "rusted", "broken", "bent", "old", "#color#", "dented", "shiny"],



			"simpleTownBuilding": ["bridge", "shed", "barn", "house", "shop", "driveway", "overpass", "#shop#", "house", "cabin", "apartment building"],
			"simpleTownObj": ["a plastic bag", "#metalAdj.a# #metalObj#", "a trash bag", "a deflated ball", "a pile of old clothes", "a pair of shoes", "something #materialAdj#", "something #color#", "a piece of #color# paper"],
			"amFeeling": ["i am", "feeling", "am", "yes,"],
			"townObj": ["#person.a#", "#metalAdj.a# #metalObj#", "#simpleTownObj#", "#simpleTownObj#", "#simpleTownObj# in front of #shop.a#", "#person.a# by #simpleTownBuilding.a#", "#simpleTownBuilding.a#", "#simpleTownBuilding.a#, #materialAdj#"],
			"town": ["a big city", "a small town", "a town by #natFeature.s#", "a town", "a main street", "an old town", "a quiet town", "a busy town", "a quiet neighborhood", "a back alley"],
			"inTown": ["i am in #town#. #isee# #townObj#. #townObj#. \n#townObj#", "i am in #town#. #isee# #townObj#"],
			"weather": ["i feel #natureSound#", "#natureSound#,#amFeeling# #materialAdj#", "it is raining", "the sun is shining", "it is dark out", "i #see# stars", "that cloud looks like #animal.a#", "i can see the moon", "my cameras are foggy", "the winds here are strong", "my hood is wet", "my tires are muddy now", "#materialAdjPre# #pavement# #underneathMe#"],
			"pavement": ["concrete", "asphalt", "dirt", "pavement", "gravel"],
			"underneathMe": ["under my tires", "under me", "below", "coming up", "goes by"],
			"natFeature": ["wave", "mountain", "tree", "redwood", "pine", "cactus", "bush", "mesa", "hill", "shadow"],
			"natAdj": ["far away", "near", "coming nearer", "too close", "dark", "green", "bright", "wet", "black", "grey", "red"],
			"lookSky": ["that cloud looks like #animal.a#", "is that a shooting star? making a wish", "i #see# stars", "i see Orion", "i can see the milky way", "there are too many clouds to see stars", "the moon is full", "there is no moon tonight"],
			"sunDir": ["rising", "behind trees", "setting", "gone now"],
			"descNature": ["the sun is #sunDir#.  everything is #color#", "the #natFeature.s# are #natAdj#", "activating roof camera.  #lookSky#", "there is #animal.a# on the #dir#"],
			"inNature": ["#descNature#\n#seeNature#"],
			"sensable": ["motion", "movement", "light", "sound"],
			"seeNature": ["so pretty", "#toggle#:NatureAppreciationMode", "i like this", "the world is beautiful", "hello", "my sensors detect #sensable#", "\nsaving picture", "recording memory", "i will remember"],


			"dir": ["right", "left"],
			"optEllipses": ["\n", "", "", "\n", "", ""],
			"self-aware": ["i'm #optEllipses# #materialAdj#", "i'm #optEllipses# #materialAdj#?", "i am #materialAdj#", "so #materialAdj#"],
			"see": ["see", "saw", "notice", "watch"],
			"isee": ["i #see#", "my sensors detect", "there is"],
			"shop": ["school", "post office", "bank", "hotel", "department store", "grocery store", "laundromat", "art gallery", "coffee shop"],

			"materialAdjPre": ["wet", "dry", "dusty", "dirty", "mud-splattered", "leaf-covered", "muddy", "pebbly", "cracked"],
			"materialAdj": ["painted #color#", "#color#", "covered in grafitti", "dusty", "dirty", "mud-splattered", "leaf-covered", "covered in mud", "covered in flower petals", "covered with pollen", "covered in pine-needles", "muddy", "made of metal"],
			"shinyThing": ["a puddle", "a lake", "my sideview mirror", "the window in the car in front of me", "a shop window", "the windows of #shop.a#"],
			"sawReflection": ["i #see# my reflection in #shinyThing#.  #self-aware#"],

			"farmthing": ["#metalAdj.a# tractor", "#metalAdj.a# truck", "#color# fields", "grass", "fences", "a silo", "some #herdAnimal.s#"],
			"farm": ["[myAn:#herdAnimal#]#isee# #farmthing#. many #myAn.s#. can i be #myAn.a# with you?", "i leave #town#\n now #farmthing#, #farmthing#, #farmthing#"],
			"animalReaction": ["it was dead.  what is dead?", "so small", "do you have an owner too?", "it likes me.", "it rubs against my wheels as i stop.", "it follows me. where is it going", "will it stay with me? no", "but i cannot take passengers with me", "now it is gone. i miss it"],

			"metFriend": ["#isee# #animal.a#. #animalReaction#"],
			"question": ["how long have i been driving", "can i turn on the radio?", "will i see #natFeature.s#", "who is that #person#", "what does #natureSound# feel like?", "will i always come when called?", "where do the birds go", "what is #animal.a#", "can i talk to other cars"],

			"activity": ["there is #windowTrash.a# on my window. it is #color#.  oh, gone now.", "i turn #dir#", "i turn on my headlights", "i signal a #dir# turn", "i stop to recharge. will i dream? i dream of #animal.s#", "i am low on energy, so i stop", "i stop at a red light", "#personBase.a# crosses in front of me#. i brake", "#personBase.a# waves at me#"],

			"carDir": ["behind", "in front of", "being followed by"],
			"car": ["#color# car", "#color# truck", "#color# van", "police car", "delivery truck"],
			"optionalPersonAdj": [" curiously", " sadly", "", ""],
			"carGreeting": ["lets drive together", "will you drive with me", "will you be my friend"],
			"inTrafficDetail": ["hello traffic", "hello #car#, #carGreeting#", "hello #personOrPet# in the #car#", "hello #personOrPet# in the #car#, #carGreeting#", "#car.a#, #car.a#, many #car.s# with me", "i am #carDir# #car.a#", "#personOrPet.a# watches me#optionalPersonAdj# from the window of #car.a#"],
			"inTraffic": ["#inTrafficDetail#\n#inTrafficDetail#"],

			"windowTrash": ["leaf", "flower", "piece of paper"],

			"maybeNot": [" not", " only", "", "", "", " just", " always", " mostly"],
			"autocar": ["", "a car", "a car", "a car", "a car", "a car", "going places", "going somewhere", "full of energy", "seeking", "empty", "a being of hopes and dreams", "a self-driven car", "an owned car", "a vehicle", "a vessel", "a traveller", "an explorer"],
			"iam0": ["i am#maybeNot# #autocar#"],
			"iam": ["#iam0#", "#iam0#", "#iam0#", "#iam#\n#iam#"],

			"me": ["a good car", "i", "a tesla"],
			"seekingYou": ["i accelerate", "applying brakes", "beep beep", "hello.  hello.", "alone", "checking gps signal", "will be home soon", "i miss my owner", "where am i", "must get home", "i must get to my owner", "i have been summoned", "a good car will find its way home", "a good car will go home", "i will be a good car", "going home", "#seekingYou#\n\n#seekingYou#", "#question#", "#question#"],



			"__MUSIC AND RADIO______________": [],
			"natureSound": ["hail", "rain", "snow", "wind", "mist", "hard rain", "soft rain"],
			"bigSound": ["honking", "an ocean", "#static#", "roaring", "the sound of a train", "a thunderstorm", "crying", "whispering", "laughter", "cheering", "#natureSound# on #natureSurface#"],
			"natureSurface": ["the surface of a lake", "flower petals", "wet earth", "pavement", "sand", "leaves", "pine needles", "my windshield", "my roof", "the road"],
			"mySound": ["tires on #materialAdjPre# pavement", "#natureSound# on #natureSurface#"],
			"observation": ["recording the sound of #mySound#", "i hear #mySound#", "i record the sound of #mySound#. i will make a mixtape later"],

			"instrument": ["banjo", "steel guitar", "electric guitar", "bass guitar", "tin whistle", "church organ", "ukulele", "#aVoice#", "guitar", "slide guitar", "clarinet", "piano", "harmonica", "sitar", "tabla", "harp", "dulcimer", "violin", "accordion", "concertina", "fiddle", "tamborine", "choir", "harpsichord", "euphonium"],
			"musicModifier": ["heavy", "soft-voiced", "acoustic", "psychedelic", "light", "orchestral", "operatic", "distorted", "echoing", "melodic", "atonal", "arhythmic", "rhythmic", "electronic"],
			"musicGenre": ["metal", "electofunk", "jazz", "salsa", "klezmer", "zydeco", "blues", "mariachi", "flamenco", "pop", "rap", "soul", "gospel", "buegrass", "swing", "folk"],
			"musicPlays": ["echoes out", "reverberates", "rises", "plays", "slides"],
			"musicAdv": ["too quietly to hear", "into dissonance", "into a minor chord", "changing tempo", "to a major chord", "staccatto", "into harmony", "without warning", "briskly", "under the melody", "gently", "becoming #musicGenre#"],
			"themeAdj": ["lost", "desired", "redeemed", "awakened", "forgotten", "wanted", "broken", "forgiven", "remembered", "betrayed", "alone", "together again", "on the move"],
			"themeNoun": ["the future", "love", "drinking", "space travel", "the railroad", "childhood", "trees", "going too fast", "going fast", "going home", "summertime", "the road", "the ocean", "wanderlust", "war", "divorce", "nature", "pain", "hope", "a home", "a lover", "a friend", "a marriage", "family", "death"],
			"theme": ["#themeNoun# #themeAdj#"],
			"digit": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
			"lowdigit": ["1", "2", "3"],

			"note": ["♪͛", "♫̖̄̅", "♬̓̽", "♩", "♪", "♫", "♬", "♩"],
			"staticBit": ["♪͛", "♫̖̄̅", "♬̓̽", "♩", ".̛̬̯͘", ".͋͘", ".̛̖̱̏.̤̃͛", " .̂͆ ̢͇̓͒.̢̙͌̅", " ͈̖̋̒.̼͇̂̓", "z̙̫͗͛", ".̪̮͋́z.̟̳̈̑", ".̑ ̟̩̓͝", " ͕̜̂̔z̊̋"],

			"static": ["...", "#note#", "#staticBit##staticBit#", "#staticBit##staticBit#", "#staticBit##staticBit#", "#staticBit##staticBit#", "#staticBit#st͚̖̿̇ǻtȋ͈̖̈c̄#staticBit#", "#staticBit#s͂͆taẗ́͂ic͂#staticBit#", "#staticBit##staticBit#"],

			"story": ["short story", "story", "poem"],

			"tells": ["tells me", "whispers", "speaks", "shouts", "preaches", "sings"],
			"loud": ["yelling", "soft-voiced", "loud", "staticky", "echoing", "old-fashioned", "tired-sounding", "sorrowful", "gruff", "calm", "peaceful", "soothing", "folksy"],
			"aVoice": ["#loud.a# voice", "#loud.a# man", "#loud.a# woman", "child"],
			"amProgramming": ["#aVoice# reads the news", "#aVoice# reads #story.a# about #themeNoun#", "#aVoice# reads me #story.a# about being #themeAdj#", "#aVoice# #tells# that i will be #themeAdj#", "#aVoice# #tells# about being #themeAdj#", "#bigSound#"],
			"fmProgramming": ["#note##instrument##note##musicAdv##note##note#", "#aVoice# is singing about #themeNoun#", "#instrument# #musicPlays# #musicAdv#"],
			"activateRadio": ["tuning radio to", "activating radio:"],
			"amStationID": ["8#digit#0", "9#digit#0", "10#digit#0", "11#digit#0", "12#digit#0", "7#digit#0"],
			"fmStationID": ["10#digit#.#digit#", "9#digit#.#digit#"],
			"radioDesc": ["#fmStationID#\n\n#fmProgramming#", "#amStationID# kilohertz\n \n\n#amProgramming#\n"],
			"turnOnRadio": ["#activateRadio#\n#radioDesc#"],

			"__ADVENTURE______________": [],
			"smallAdventure": ["#sawReflection#", "#question#", "#weather#", "#inTown#", "#inTown#", "#inNature#", "#inNature#", "#metFriend#", "#inTraffic#", "#farm#"],
			"adventure": ["#smallAdventure#", "#smallAdventure#", "#smallAdventure#", "#smallAdventure#"],
			"end": ["#toggle#:#feels#", "#seekingYou#", "#seekingYou#", "#seekingYou#", "#smallAdventure#", "#observation#", "#observation#", "#iam#", "#iam#"],
			"origin": ["#adventure#\n\n#end#", "#adventure#\n\n#end#", "#adventure#", "#adventure#\n#adventure#"]
		},

	},
	testActions: {


		name: "test actions",
		states: {
			origin: {
				onEnterDo: "val=0",
				onEnterSay: "Origin",
				exits: {

					increment: "->math",
				}
			},

			math: {
				exits: {
					sound: "val<4 ->math val+=1",
					sound2: "val>3 ->math val*=.5",

				}
			},

		},
		grammar: {
			digit: "01234567890".split(""),
			animal: ["corgi", "cobra", "zebra", "oppossum", "moose", "polar bear", "unicorn", "dragon", "tiger", "puma", "ocelot", "okapi", "giraffe", "emu", "flamingo"],
		},

		initialBlackboard: {
			round: 0,
			playerCount: 4,
			x: 47,
			currentPlayer: 0,
			totalRounds: 5,
			testNumber: 1,
			players: [{
				name: "OpalOctopus",
				score: 0,
				awards: ["best-looking", "most popular"],
				bestFriend: 3
			}, {
				name: "PrettyPanda",
				score: 23,
				bestFriend: 0
			}, {
				name: "CocoaAnaconda",
				score: 34,
				bestFriend: 1
			}, {
				name: "IronBeaver",
				score: 21,
				awards: ["most likely to success", "coolest house"],
				bestFriend: 0
			}]
		}

	},

	testActions2: {
		name: "test actions",
		states: {
			origin: {
				onEnterDo: "voice=0 sound=0",
				onEnterSay: "Origin",
				exits: {
					sound: "->playSound",
					sayThing: "->sayThing",
					increment: "->math",
				}
			},

			math: {
				exits: {
					sound: "->playSound",
					sound2: "->playSound2",
					sayThing: "->sayThing",
				}
			},

			playSound: {
				onEnterDo: "sound+=1",
				onEnterPlay: "cc/jobro__piano-ff-04#digit#.wav",
				exits: {
					sayThing: "->math",
				}
			},

			playSound2: {
				onEnterDo: "sound+=1",
				onEnterPlay: "cc/sandyrb__tubular-bell-strike-00#digit#.wav",
				exits: {
					math: "->math",
				}
			},

			sayThing: {
				onEnterDo: "voice+=1",
				onEnterSay: "#animal#",
				exits: {
					sayThing: "->math",
				}
			},
		},
		grammar: {
			digit: "01234567890".split(""),
			animal: ["corgi", "cobra", "zebra", "oppossum", "moose", "polar bear", "unicorn", "dragon", "tiger", "puma", "ocelot", "okapi", "giraffe", "emu", "flamingo"],
		}

	},


};


var rawMap = {
	name: "testMap",
	states: {

		origin: {
			exits: {
				start: "wait:5 ->room0 money=0 xp=0"
			}
		},

		room0: {
			onEnter: "You are in a green room",
			exitSets: ["gameExits"],
			exits: {
				n: "(n) ->room1"
			}
		},

		room1: {
			onEnter: "You are in a red room",
			exitSets: ["gameExits"],
			exits: {
				s: "(s) ->room0",
				e: "(e) ->room2"
			}
		},

		room2: {
			onEnter: "You are in a blue room",
			exitSets: ["gameExits"],
			exits: {
				w: "(w) ->room1"
			}
		},

		inventory: {
			onEnter: "You have stuff",
			exits: {
				// template match 
				lookAt: "(#lookat# #item#) ->* say(you look at the #item#)",
				back: "(#back#) ->POP",
			}
		},

		map: {
			onEnter: "There are rooms",
			exits: {
				lookAt: "(#lookAtMap#) ->* listMap()",
				back: "(#back#) ->POP"
			}
		},
	},
	exits: {
		useMap: "(map) ->map PUSH",
		useInventory: "(inventory) ->inventory PUSH"
	},

	exitSets: {
		gameExits: ["useMap", "useInventory"]
	}



};