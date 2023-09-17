# LIFELINE

## Inspiration
In the pursuit of increased sustainability and reducing climate change, there are two main pillars of action: working towards a greener future, and addressing the current dangers already caused by our rapidly warming climate. Natural disasters have been on rise, ranging from the Maui wildfires to hurricanes on the eastern seaboard. These natural disasters are devastating for many individuals and local communities, especially those who are low-income and minorities.  Thus, on-demand access to vital information and lifesaving resources early on is crucial to a successful community-scale recovery and resilience after tragedy. Organizations like the Red Cross and FEMA are often the first to mobilize to address these disasters; however, due to limited Internet access, there is a disconnect between first responders and people in need.  LifeLine is this essential line of communication during a natural disaster.

## What It Does
LifeLine is an SMS-based platform for disaster relief organizations to provide people with the resources they need most. During natural disasters, many individuals and communities find themselves in desperate need of essential resources such as food, clean water, shelter, and medical care to survive. Using input of the user’s GPS coordinates, LifeLine provides a list of nearby available resources, as well as walking directions to the nearest disaster relief services that have the resources requested by the user. Notably, emergency responders can also submit hazard zones that should be avoided on the LifeLine website, and LifeLine will alert users near the hazard zone, modifying their directions via SMS to go around dangerous areas.  Swift access to this information can mean the difference between life and death.

Lifeline ultimately restores a sense of safety and stability, facilitates recovery, and enables individuals and communities to rebuild their lives in the face of adversity.

## Why SMS?
Natural disasters often cause the destruction of critical infrastructure, which leads to most forms of wireless communication being completely offline, except for SMS. SMS, or Short Message Service, is uniquely robust because of its simplicity and small package size when compared to cellular data and calling, allowing the network to stay online even when some towers may be destroyed. This makes SMS the perfect system for getting people the information they need during natural disasters and emergencies.

## How We Built It
LifeLine has three components: the SMS messaging platform, mapping algorithm, and organizational interface. The SMS platform  is based on a Flask server utilizing the Twilio SMS API to send and receive messages. A list of the nearest resources and walking directions to the nearest resource (based on the user’s indicated GPS coordinates or zip code) are thus provided to the user. 

On the backend, Google Maps API and Shapely were used to construct a map of the region, including points of interest and hazardous areas. A path finding algorithm was then developed to find the shortest walking path between the user’s current location and the resources they need, avoiding hazards along the way. 

Finally, there is a React web application that allows disaster relief organizations to update the map of where resources are located and known areas of hazards that people should avoid. The website also serves as a valuable interface for users with wifi to access the SMS platform. 

## Challenges we faced
Our team struggled to identify an idea that aligned with our mission of progress and service and was achievable within the given hackathon timeframe.

However, after finding an idea we were passionate about, we relied on each other, as a diversely skilled team, as well as on mentors and online communities to accomplish our vision.

We challenged ourselves to be very intentional in prioritizing the implementation of features in organized versions, so that we could create a functional minimum viable product and then scale up in complexity and sophistication of features afterwards. We wanted to build a simple yet highly effective product with truly meaningful features that add value for the user (individuals currently experiencing a natural disaster and organizations seeking to support them). 

## Accomplishments 
Our team is extremely proud of creating an elegant solution to a major sustainability issue.  Our  highly accessible user-friendly interface allows a diverse range of individuals to access our service and platform.  We are also proud of creating, developing, and integrating an accurate path finding algorithm, which finds the shortest path between two points while avoiding dangerous areas.

## What we learned
Our team learned many new skills over the course of this hackathon, from expanding on our React.JS knowledge, Node.JS knowledge, Google Maps API integration, Flask API integration, and using Docker.

## What’s next for LifeLine
LifeLine does not end with HackMIT. The disaster relief services provided can be expanded to other areas in the United States, and ultimately, worldwide. Other features to implement would be dynamically updating the database via SMS and a website interface, ultimately allowing users without Internet access to also submit resource information. LifeLine hopes to aid individuals and communities to rebuild their lives in the face of adversity.




