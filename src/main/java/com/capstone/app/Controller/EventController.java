package com.capstone.app.Controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.capstone.app.Model.Event;
import com.capstone.app.DAO.CalendarDAO;

@RestController 
public class EventController {
    
    @Autowired
    CalendarDAO eventRepository;
    
    @RequestMapping(value="/allevents", method=RequestMethod.GET)
    public List<Event> allEvents() {
        return eventRepository.findAll();
    }
    
    @RequestMapping(value="/event", method=RequestMethod.POST)
    public Event addEvent(@RequestBody Event event) {
        Event created = eventRepository.save(event);
        return created; 
    }
    
    @RequestMapping(value="/event", method=RequestMethod.PATCH)
    public Event updateEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }
    
    @RequestMapping(value="/event", method=RequestMethod.DELETE)
    public void removeEvent(@RequestBody Event event) {
        eventRepository.delete(event);
    }
    
    @RequestMapping(value="/events", method=RequestMethod.GET)
    public List<Event> getEventsInRange(@RequestParam(value = "start", required = true) String start, 
                                        @RequestParam(value = "end", required = true) String end) {
        Date startDate = null;
        Date endDate = null;
        SimpleDateFormat inputDateFormat=new SimpleDateFormat("yyyy-MM-dd");
        
        try {
            startDate = inputDateFormat.parse(start);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad start date: " + start);
        }
        
        try {
            endDate = inputDateFormat.parse(end);
        } catch (ParseException e) {
            throw new BadDateFormatException("bad end date: " + end);
        }
        
        return eventRepository.findByDatesBetween(startDate, endDate); 
    }
    
}
@ResponseStatus(HttpStatus.BAD_REQUEST)
class BadDateFormatException extends RuntimeException {
  private static final long serialVersionUID = 1L;

    public BadDateFormatException(String dateString) {
        super(dateString);
    }
}