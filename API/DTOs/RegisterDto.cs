using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [MaxLength(30)]
    [MinLength(5)]
    public required string UserName { get; set; }
    
    [MinLength(5)]
    public required string Password { get; set; }
}