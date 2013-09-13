# LeapMotion

##Self-updating, swipable image gallery using: 
- [Leap Motion](https://www.leapmotion.com/)
- [AngularUI for AngularJS](http://angular-ui.github.io/)
- Web worker for pinging Flickr for new photos every 5 seconds
- [Flickr API](http://www.flickr.com/services/api/)

###But I don't have a Leap Motion device!
You can see the demo in action on my [Instagram account](http://instagram.com/p/d3897XTVZu/)

##Prerequisites: 
- [Leap Motion software](https://www.leapmotion.com/setup) must be installed and running
- Demo must be run as http:// since a cross-domain XMLHttpRequest via CORS (Cross-Origin Resource Sharing) is done, and file:// has limited support for this
- You need a [FlickrAPI key](http://www.flickr.com/services/api/misc.api_keys.html)

##Usage: 
When running the demo, you will initially see three textboxes:

* **Flickr Photoset Id:** The ID of a Flickr photoset which can be found in the URL. Example: ID=72157627670507770 for the photoset with URL http://www.flickr.com/photos/webdagene/sets/72157627670507770/
* **Flickr API Key:** You need to supply an API key before the gallery will appear
* **Previous Flickr ping (epoch):** Timestamp (in epoch time) for when photos were last retrieved from Flickr. This will update every 5 seconds. 

###Gestures: 
* **Swipe:** You can swipe left and right to navigate between the photos (or you can click the previous/next links or click on a thumbnail)
* **Scroll:** You can move your hand up and down over the Leap Motion sensor in order to scroll on the page.

Note: I've added some limitations as to where your hand should be placed when scrolling and swiping (to make sure you don't do both at the same time). Scrolling works best close to the sensor while swiping works best higher up. 


## License

MIT © Karoline Klever
