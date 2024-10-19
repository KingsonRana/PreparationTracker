using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PreparationTracker.DTO.RequestDTO;
using PreparationTracker.DTO.ResponseDTO;
using PreparationTracker.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PreparationTracker.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/[controller]")]
    public class TopicManagementController : ControllerBase
    {
        private readonly TopicProblemService _topicService;
        
        public TopicManagementController(TopicProblemService topicService)
        {
            _topicService = topicService;
        }

        // GET: api/TopicManagement/topics/{examId}
        [HttpGet("{examId}/Topic")]
        public async Task<ActionResult<IEnumerable<TopicResponseDto>>> GetTopics(Guid examId)
        {
            try
            {
                var topics = await _topicService.GetTopicsAsync(examId);
                return Ok(topics);
            }
            catch (Exception ex) {
                throw new Exception("Error occured while fetching topic");
            }
        }

        // GET: api/TopicManagement/subtopics/{parentId}
        [HttpGet("{parentId}/SubTopic")]
        public async Task<IActionResult> GetSubTopics(Guid parentId)
        {
            try
            {
                var subTopics = await _topicService.GetSubTopicsAsync(parentId);
                return Ok(subTopics);
            }
            catch (Exception ex) {
                throw new Exception("Error occured while fetching subtopic");
            }
        }

        // POST: api/TopicManagement/{examId}/topics
        [HttpPost("{examId}/Topic")]
        public async Task<ActionResult<TopicResponseDto>> CreateTopic(Guid examId, [FromBody] TopicRequestDto requestDto)
        {
            try
            {
                var createdTopic = await _topicService.CreateTopicAsync(examId, requestDto);
                return Ok(createdTopic);
            }
            catch (Exception ex) {
                throw new Exception("Error occured while creating topic");
            }
            
        }

        // POST: api/TopicManagement/{examId}/{parentId}/subtopics
        [HttpPost("{examId}/{parentId}/SubTopic")]
        public async Task<ActionResult<TopicResponseDto>> CreateSubTopic(Guid parentId, Guid examId, [FromBody] TopicRequestDto requestDto)
        {
            try
            {
                var createdSubTopic = await _topicService.CreateSubTopicAsync(parentId, examId, requestDto);
                return Ok(createdSubTopic);
            }
            catch (Exception ex) {
                throw new Exception("Error occured while creating subtopic");
            }
           
        }

        // PUT: api/TopicManagement/topics/{id}
        [HttpPut("Topics/{id}")]
        public async Task<IActionResult> UpdateTopic(Guid id, [FromBody] TopicRequestDto requestDto)
        {
            try
            {
                var updatedTopic = await _topicService.UpdateTopicAsync(id, requestDto);
                return Ok(updatedTopic);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while updating topic");
            }
        }

        // DELETE: api/TopicManagement/topics/{id}
        [HttpDelete("Topics/{id}")]
        public async Task<IActionResult> DeleteTopic(Guid id)
        {
            try
            {
                await _topicService.DeleteTopicAsync(id);
                return NoContent();
            }
            catch (Exception ex) {
                throw new Exception("Error while Deleting topic");
            }
        }

        // GET: api/TopicManagement/{topicId}/problems
        [HttpGet("{topicId}/Problems")]
        public async Task<IActionResult> GetProblems(Guid topicId)
        {
            var problems = await _topicService.GetProblemsAsync(topicId);
            return Ok(problems);
        }

        // POST: api/TopicManagement/{topicId}/problems
        [HttpPost("{topicId}/Problems")]
        public async Task<IActionResult> AddProblem(Guid topicId, [FromBody] ProblemsRequestDto request)
        {
            var createdProblem = await _topicService.AddProblemAsync(topicId, request);
            return CreatedAtAction(nameof(GetProblems), new { topicId = topicId }, createdProblem);
        }

        // PUT: api/TopicManagement/problems/{id}
        [HttpPut("Problems/{id}")]
        public async Task<IActionResult> UpdateProblem(Guid id, [FromBody] ProblemsRequestDto request)
        {
            var updatedProblem = await _topicService.UpdateProblemAsync(id, request);
            return Ok(updatedProblem);
        }

        // DELETE: api/TopicManagement/problems/{id}
        [HttpDelete("Problems/{id}")]
        public async Task<IActionResult> DeleteProblem(Guid id)
        {
            await _topicService.DeleteProblemAsync(id);
            return NoContent();
        }
    }
}
