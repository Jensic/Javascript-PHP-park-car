<div class="map">
    <div class="map-text">
        <label>Select</label>
        <select onchange="getLocations();" id="interest">
            <option value="default">Service</option>
            <option value="atm">ATM</option>
            <option value="beauty_salon">Beauty Parlor</option>
            <option value="church">Church</option>
            <option value="doctor">Doctor</option>
            <option value="parking">Parking</option>
            <option value="library">Library</option>
            <option value="restaurant">Restaurant</option>
        </select>
        <label>Within</label>
        <select onchange="getLocations();" id="distance">
            <option value="500" selected>500</option>
            <option value="1000">1000</option>
            <option value="1500">1500</option>
            <option value="2000">2000</option>
        </select>
        <label>Meters</label>
    </div>
    <br />
    <div id="map-area"></div>
</div>
