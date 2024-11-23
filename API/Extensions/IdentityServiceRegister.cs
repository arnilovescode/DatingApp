using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class IdentityServiceRegister
{
    public static IServiceCollection AddIdentityService(this IServiceCollection services, IConfiguration config)
    {


        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(optaions =>
        {
            var tokenKey = config["TokenKey"] ?? throw new Exception("Token key not found.");
            optaions.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey))

            };
        });

        return services;
    }
}