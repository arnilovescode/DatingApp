using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class AccountController(DataContext context, ITokenService tokenService) : BaseAPIController
{

    [HttpPost("Register")]
    public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
    {
        if (await UserAlreadyExist(registerDto.UserName)) return BadRequest("User name already taken");
        using var hmac = new HMACSHA512();

        var user = new AppUser()
        {
            UserName = registerDto.UserName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key

        };
        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDto
        {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };

    }

    private async Task<bool> UserAlreadyExist(string username)
    {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.UserName.ToLower().Equals(loginDto.UserName.ToLower()));

        if (user == null)
            return BadRequest("Username doesn't exist.");

        using var hmac = new HMACSHA512();
        hmac.Key = user.PasswordSalt;
        var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < passwordHash.Length; i++)
        {
            if (passwordHash[i] != user.PasswordHash[i])
                return BadRequest("Password seems to be incorrect.");

        }

        return new UserDto
        {
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };


    }

}