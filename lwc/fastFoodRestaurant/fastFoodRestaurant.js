import { LightningElement } from 'lwc';

import IMAGES from "@salesforce/resourceUrl/Food1";
import { createRecord } from 'lightning/uiRecordApi';
import Food2 from "@salesforce/resourceUrl/Food2";

export default class FastFoodRestaurant extends LightningElement {
    torontoImage =IMAGES;
    Food2=Food2
    pin=false
    home=true
    pincode=0
    available_msg=''
    notavail=false
    pickup=""
    Orderhandler()
    {
        this.pin=true
        this.home=false
    }

    PickUphandler()
    {
        this.pickup="pickup"
        this.home=false
        this.DelAvail=true
    }
    pinHandler(event)
    {
        this.pincode=event.target.value;
    }  
    DelAvail=false
    BillAvail=false
    PinSumithandler()
    {
        if(this.pincode==60446)
        {
            this.pin=false
            this.DelAvail=true
            this.available_msg="Delivery is Available"
        }
        else if(this.pincode>60441 && this.pincode<60451)
        {
            this.pin=false
            this.DelAvail=true
            this.available_msg="Delivery is Available with Extra Cost"
        }
        else if(this.pincode==60441 || this.pincode==60451)
        {
            this.pin=false
            this.DelAvail=true
            this.available_msg="Delivery is Available with Extra Cost"
        }
        else
        {
            this.pin=false
            this.notavail=true
            this.available_msg="Delivery is Not Available"
        }
    }
    Pizza=0
    Burger=0
    Drink=0
    Bill=0
    final_Bill=0
    current_record=0
    FoodHandler()
    {
        this.Pizza=this.refs.Pizza.value;
        this.Burger=this.refs.Burger.value;
        this.Drink=this.refs.Drink.value;
        if(this.Pizza>0 || this.Burger>0 || this.Drink>0)
        {
        if(this.pincode==60446 || this.pickup=="pickup")
        {
            this.BillAvail=true
            this.DelAvail=false;
            this.Bill=(this.Pizza*5)+(this.Burger*5)+(this.Drink*3);
            this.final_Bill=this.Bill+((5/100)*this.Bill);
            console.log(this.final_Bill)
        }
        else if(this.pincode>60441 && this.pincode<60451)
        {
            this.BillAvail=true
            this.DelAvail=false;
            this.Bill=((this.Pizza*5)+(this.Burger*5)+(this.Drink*3));
            this.final_Bill=this.Bill+((5/100)*this.Bill)+5;
        }
        else if(this.pincode==60441 || this.pincode==60451)
        {
            this.BillAvail=true
            this.DelAvail=false;
            this.Bill=(this.Pizza*5)+(this.Burger*5)+(this.Drink*3);
            this.final_Bill=this.Bill+((5/100)*this.Bill)+7;    
        }
        const fields={'Pizza__c':this.Pizza,'Burger__c':this.Burger,'Drink__c':this.Drink,'Enter_Your_Pincode__c':this.pincode,'Bill__c':this.final_Bill}
        const recordInput={apiName:'Order__c',fields}
        console.log(this.final_Bill)
        createRecord(recordInput).then(Response=>
            {
                console.log(Response.id);
                this.current_record=Response.id
            })
      }
    }
    Homehandler()
    {
        this.home=true
        this.BillAvail=false
        this.notavail=false
    }
    Refreshhandler()
    {
        this.home=true
        this.pin=false
        this.BillAvail=false
        this.notavail=false
        this.DelAvail=false;

        this.available_msg=''
        this.pickup=""

        this.pincode=0
        this.Pizza=0
        this.Burger=0
        this.Drink=0
        this.final_Bill=0
        this.Bill=0
    }
}