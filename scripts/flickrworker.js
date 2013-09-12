self.addEventListener('message', function (e) {
    var seconds = e.data[0];
    var photoSetId = e.data[1];
    var apiKey = e.data[2];

    if (seconds == '' || photoSetId == '' || apiKey == '')
        return;

    var url = "http://api.flickr.com/services/rest/?api_key=" + apiKey + "&method=flickr.photosets.getPhotos&photoset_id=" + photoSetId + "&extras=date_upload";

    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            var photos = [];
            var photoArray = getPhotosArray(xhr.responseText);

            for (var i = 0; i < photoArray.length; i++) {
                var photoUrl = "http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_z.jpg";
                var attributes = getPhotoAttributes(photoArray[i]);
             
                var dateUpload = attributes[6];
                if (dateUpload > seconds) {
                    photoUrl = photoUrl.replace("{id}", attributes[0]);
                    photoUrl = photoUrl.replace("{secret}", attributes[1]);
                    photoUrl = photoUrl.replace("{server}", attributes[2]);
                    photoUrl = photoUrl.replace("{farm}", attributes[3]);
                    photos.push(photoUrl);
                }
            }

            self.postMessage(photos);
            return;
        }
    };
    xhr.send();
}, false);

function getPhotoAttributes(photoXml) {
    var attributes = new Array();
    var myregexp = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
    var match = myregexp.exec(photoXml);
    while (match != null) {
        var attribute = match[2].replace('"', '').trim();
        attributes.push(attribute);
        match = myregexp.exec(photoXml);
    }
    return attributes;
}

function getPhotosArray(xml) {
    var photos = new Array();
    var myRegexp = /(<photo (.*?)>)/g;
    var match = myRegexp.exec(xml);
    while (match != null) {
        photos.push(match[0]);
        match = myRegexp.exec(xml);
    }
    return photos;
}