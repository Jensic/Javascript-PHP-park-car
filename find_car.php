<h1>Calculate your route</h1>

<form id="calculate-route" name="calculate-route" action="#" method="get">
   
    <label for="from">From:</label>
    <input type="text" id="from" name="from" required="required" placeholder="An address" size="30" />
    <a id="from-link" href="#">Get my position</a>
    <br />

    <label for="to">To:</label>
    <input type="text" id="to" name="to" required="required" placeholder="Another address" size="30" />
    <a id="to-link" href="#">Get my position</a>
    <br />

    <div> 
        <button type="submit" class="btn calc-buttons">Submit</button> 
        <button type="reset" class="btn calc-buttons">Reset</button>
    </div>
        
</form>

<p id="error"></p>
